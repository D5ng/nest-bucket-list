import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import argon2 from 'argon2'
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async signIn({ username, password }: SignInDto) {
    const user = await this.userService.findByUsername(username)
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 유저입니다.')
    }

    const isPasswordValid = await argon2.verify(user.password, password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.')
    }

    const tokens = await this.getTokens(user)
    await this.updateRefreshToken(user.id, tokens.refreshToken)

    return tokens
  }

  async signUp({ username, password, name }: SignUpDto) {
    const existingUser = await this.userService.findByUsername(username)
    if (existingUser) {
      throw new ConflictException('이미 존재하는 유저입니다.')
    }

    const hashedPassword = await this.hashFn(password)

    const newUser = await this.userService.create({ name, username, password: hashedPassword })

    const tokens = await this.getTokens(newUser)

    await this.updateRefreshToken(newUser.id, tokens.refreshToken)

    return tokens
  }

  async signOut(userId: string) {
    await this.userService.update(userId, { refreshToken: null })
  }

  async refreshAllTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId)

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('리프레시 토큰이 존재하지 않습니다.')
    }

    const isRefreshTokenValid = await argon2.verify(user.refreshToken, refreshToken)
    if (!isRefreshTokenValid) {
      throw new ForbiddenException('유효하지 않은 리프레시 토큰입니다.')
    }

    const tokens = await this.getTokens(user)
    await this.updateRefreshToken(user.id, tokens.refreshToken)

    return tokens
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashFn(refreshToken)
    await this.userService.update(userId, { refreshToken: hashedRefreshToken })
  }

  private async hashFn(data: string) {
    return argon2.hash(data)
  }

  private async getTokens({ id, username }: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: id, username },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET')!,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: id, username },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET')!,
          expiresIn: '7d',
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }
}
