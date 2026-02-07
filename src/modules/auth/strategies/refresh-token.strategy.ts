import { JwtPayload, UserWithRefreshToken } from '@/shared/types/jwt.type'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET')!,
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: JwtPayload): UserWithRefreshToken {
    const refreshToken = req.get('Authorization')?.replace('Bearer ', '').trim()

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found in request')
    }

    return { ...payload, refreshToken }
  }
}
