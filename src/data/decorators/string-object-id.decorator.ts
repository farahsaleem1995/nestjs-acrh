import { AutoMap } from '@automapper/classes';
import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsString, IsMongoId } from 'class-validator';
import { toObjectId } from '../utils';

export function StringObjectId() {
	return applyDecorators(
		AutoMap(),
		IsString(),
		IsMongoId(),
		Transform(({ value }) => toObjectId(value)),
	);
}
