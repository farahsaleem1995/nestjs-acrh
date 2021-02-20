import { InternalServerErrorException } from '@nestjs/common';
import { Schema } from 'mongoose';
import { BaseModel } from '../models';

export type Ref<T extends BaseModel> = T | string;

// export const toObjectId = (id: string): Schema.Types.ObjectId => {
// 	try {
// 		return new Schema.Types.ObjectId(id);
// 	} catch (e) {
// 		throw new InternalServerErrorException(`Failed Casting for id ${id}`);
// 	}
// };
