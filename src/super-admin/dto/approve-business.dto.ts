import { IsMongoId } from 'class-validator';

export class ApproveBusinessDto {
  @IsMongoId()
  bizId: string;
}
