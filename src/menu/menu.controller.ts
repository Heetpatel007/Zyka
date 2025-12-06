import { Controller, Post, Get, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { Role } from 'src/users/schemas/user.schema'; // Assuming Role is defined in user schema

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  findAll() {
    return this.menuService.findAll(); // Public
  }

  @Get(':bizId')
  findByAdmin(@Param('bizId') bizId: string) { 
    return this.menuService.findByBiz(bizId); // Admin's menu
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createDto: CreateMenuItemDto) {
    return this.menuService.create(createDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateDto: UpdateMenuItemDto) {
    return this.menuService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
