import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UsersService } from './users.service';
import { Role } from './schemas/user.schema';
@Controller('user')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const user = await this.usersService.findById(req.user.userId);
    if (user && user.role === Role.ADMIN) {
      return { ...user, bizId: user.bizId, role: user.role };
    }

    return user;
  }
}
