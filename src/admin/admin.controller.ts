
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorators';
import { Role } from '../users/schemas/user.schema';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  @Get('manage-staff')
  @Roles(Role.ADMIN)
  getStaff() {
    return { message: 'Manage your staff (admin only)' };
  }
}
