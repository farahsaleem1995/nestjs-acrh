import { BaseModel } from 'src/data/models';
import { CreateOneParamDto, FindAllParamDto, UpdateOneParamDto } from '../types';

export interface IGetAllStrategy<TModel extends BaseModel> {
	getAll(findAllDto: FindAllParamDto<TModel>): TModel[] | Promise<TModel[]>;
}

export interface IGetByIdStrategy<TModel extends BaseModel> {
	getById(id: string): TModel | Promise<TModel>;
}

export interface ICreateStrategy<TModel extends BaseModel> {
	create(createDto: CreateOneParamDto<TModel>): TModel | Promise<TModel>;
}

export interface IUpdateStrategy<TModel extends BaseModel> {
	update(id: string, updateDto: UpdateOneParamDto<TModel>): TModel | Promise<TModel>;
}

export interface IDeleteStrategy<TModel extends BaseModel> {
	delete(id: string): TModel | Promise<TModel>;
}
