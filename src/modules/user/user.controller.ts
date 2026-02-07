import { AccessTokenGuard } from '@/shared/guards/access-token.guard'
import { Body, Controller, Get, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    const userId = req.user['sub']

    if (!userId) {
      throw new UnauthorizedException('접근 권한이 없습니다.')
    }

    const { id, name, username } = await this.userService.findById(userId)

    return {
      id,
      name,
      username,
    }
  }

  @UseGuards(AccessTokenGuard)
  @Put('profile')
  async updateProfile(@Req() req: RequestWithUser, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user['sub']

    if (!userId) {
      throw new UnauthorizedException('접근 권한이 없습니다.')
    }

    const user = await this.userService.update(userId, updateUserDto)

    return this.shieldUserInfo(user)
  }

  private shieldUserInfo({ id, name, username }: User) {
    return {
      id,
      name,
      username,
    }
  }
}
