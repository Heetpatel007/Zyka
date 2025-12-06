import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItem } from './schemas/menu.schemas';

@Injectable()
export class MenuService {
  constructor(@InjectModel(MenuItem.name) private menuModel: Model<MenuItem>) {}

  async create(createDto: CreateMenuItemDto) {
    const item = new this.menuModel(createDto);
    return await item.save();
  }

  async findAll() {
    return this.menuModel.find().exec(); // Public view for all users
  }

  async findByBiz(bizId: string) {
    return this.menuModel.find({ bizId }).exec(); // Business view
  }

  async update(id: string, updateDto: UpdateMenuItemDto) {
    const updated = await this.menuModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Menu item not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.menuModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Menu item not found');

    return {
      success: true,
      message: `Menu item '${deleted.itemName}' has been removed.`,
      id: deleted._id,
    };
  }
}
