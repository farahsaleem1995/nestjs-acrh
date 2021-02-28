import { BaseModel } from 'src/data/models';
import { CreateOneQuery, FindAllQuery, UpdateOneQuery } from 'src/data/types';

export type FindAllParamDto<TModel extends BaseModel> = FindAllQuery<TModel>;

export type CreateOneParamDto<TModel extends BaseModel> = CreateOneQuery<TModel>;

export type UpdateOneParamDto<TModel extends BaseModel> = UpdateOneQuery<TModel>;
