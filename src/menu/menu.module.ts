import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuItem, MenuItemSchema } from './schemas/menu.schemas';
@Module({
  imports: [MongooseModule.forFeature([{ name: MenuItem.name, schema: MenuItemSchema }])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
