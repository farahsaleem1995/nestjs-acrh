import { ClassConstructor } from 'class-transformer';
import { BaseModel } from 'src/data/models';
import { Operations } from '../enums';
import { IOperation } from './operation.interface';

export interface CommonFeature<TModel extends BaseModel> {
	model: ClassConstructor<TModel>;
	useDefaults: Operations[];
}

export interface CommonOperation<
	TModel extends BaseModel,
	TRes extends BaseModel | BaseModel[],
	TArgs = any
> {
	name: string;
	useClass: ClassConstructor<IOperation<TModel, TRes, TArgs>>;
}
