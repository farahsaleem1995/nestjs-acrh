import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { BaseModel } from '../models';

export type ModelType<TModel extends BaseModel> = ReturnModelType<AnyParamConstructor<TModel>>;
