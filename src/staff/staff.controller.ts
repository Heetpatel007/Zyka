
import {
  Controller, Post, Body, Get, Param, Patch, Delete, UseGuards,
  Req
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { Role } from 'src/users/schemas/user.schema';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin/staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  @Post('/create')
  create(@Req() req, @Body() dto: CreateUserDto) {
    const adminBzid = req.user?.bzid;
    return this.staffService.createStaff(dto, adminBzid);
  }
  // @Get()
  // findAll() {
  //   return this.staffService.findAllStaff();
  // }

  @Get('find/:email')
  findOne(@Param('email') email: string) {
    return this.staffService.findByEmail(email);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() body: Partial<CreateUserDto>) {
    return this.staffService.updateByEmail(email, body);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.staffService.deleteByEmail(email);
  }
}
