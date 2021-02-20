import { BadRequestException } from '@nestjs/common';
import { Schema } from 'mongoose';

export function toObjectId(id: string): Schema.Types.ObjectId {
	try {
		return new Schema.Types.ObjectId(id);
	} catch (e) {
		throw new BadRequestException(`"${id}" is not a valid ID`);
	}
}
