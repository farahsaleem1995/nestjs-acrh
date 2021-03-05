import { Body, PipeTransform, Type } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { TypeValidationPipe } from '../pipes';

export function ValidateBody(
	bodyType: ClassConstructor<any>,
	...pipes: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[]
) {
	return Body(TypeValidationPipe(bodyType), ...pipes);
}
