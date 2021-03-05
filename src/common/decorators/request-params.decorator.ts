import { Param } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from 'src/data/models';
import { ExistenceValidationPipe } from '../pipes';

export function GetById<TModel extends BaseModel>(
	modelCtr: ClassConstructor<TModel>,
	property = 'id',
) {
	return Param(property, ExistenceValidationPipe(modelCtr, { transform: true }));
}

export function ValidateById<TModel extends BaseModel>(
	modelCtr: ClassConstructor<TModel>,
	property = 'id',
) {
	return Param(property, ExistenceValidationPipe(modelCtr));
}
