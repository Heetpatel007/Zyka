import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/users/schemas/user.schema';

@Injectable()
export class StaffService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async createStaff(dto: CreateUserDto, adminBzid: string) {
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.userModel.create({
      ...dto,
      password: hashed,
      bzid: adminBzid, // ✅ force bzid from admin
      role: Role.STAFF,
    });
  }


  // async findAllStaff() {
  //   return this.userModel.find({ role: Role.STAFF });
  // }
  async findByEmail(email: string) {
    return this.userModel.findOne({ email, role: Role.STAFF });
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async updateByEmail(email: string, updateData: Partial<CreateUserDto>) {
    return this.userModel.findOneAndUpdate({ email, role: Role.STAFF }, updateData, { new: true });
  }


  async deleteByEmail(email: string) {
    return this.userModel.findOneAndDelete({ email, role: Role.STAFF });
  }

}
