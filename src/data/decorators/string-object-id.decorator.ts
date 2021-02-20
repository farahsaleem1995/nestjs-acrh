import { AutoMap } from '@automapper/classes';
import { applyDecorators } from '@nestjs/common';
import { Expose, Transform } from 'class-transformer';
import { IsString, IsMongoId } from 'class-validator';
import { toObjectId } from '../utils';

export function StringObjectId() {
	return applyDecorators(
		AutoMap(),
		IsString(),
		IsMongoId(),
		Expose(),
		Transform(({ value }) => toObjectId(value)),
	);
}
