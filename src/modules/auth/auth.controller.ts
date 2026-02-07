import { AccessTokenGuard } from '@/shared/guards/access-token.guard'
import { RefreshTokenGuard } from '@/shared/guards/refresh-token.guard'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @UseGuards(AccessTokenGuard)
  @Get('signout')
  async signOut(@Req() req: RequestWithUser) {
    return this.authService.signOut(req.user['sub'])
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshAllTokens(@Req() req: RequestWithUser) {
    const userId = req.user['sub']
    const refreshToken = req.user['refreshToken']
    return this.authService.refreshAllTokens(userId, refreshToken)
  }
}
