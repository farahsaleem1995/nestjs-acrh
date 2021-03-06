import { Body, Param, PipeTransform, Query, Type } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from 'src/data/models';
import { ExistenceValidationPipe, QueryTransformPipe, TypeValidationPipe } from '../pipes';

export function ValidateBody(
	bodyType: ClassConstructor<any>,
	...pipes: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[]
) {
	return Body(TypeValidationPipe(bodyType), ...pipes);
}

export function ValidateById<TModel extends BaseModel>(modelCtr: ClassConstructor<TModel>) {
	return Param('id', ExistenceValidationPipe(modelCtr));
}

export function TransformQuery(
	queryModelCtr: ClassConstructor<any>,
	...pipes: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[]
) {
	return Query(QueryTransformPipe(queryModelCtr), ...pipes);
}
