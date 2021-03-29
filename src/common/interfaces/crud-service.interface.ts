import { BaseModel } from 'src/data/models';
import { FindAllParamDto, CreateOneParamDto, UpdateOneParamDto } from '../types';

export interface ICrudService<TModel extends BaseModel> {
	getAll(query: FindAllParamDto<TModel>): TModel[] | Promise<TModel[]>;

	getById(id: string): TModel | Promise<TModel>;

	create(createDto: CreateOneParamDto<TModel>): TModel | Promise<TModel>;

	update(id: string, updateDto: UpdateOneParamDto<TModel>): TModel | Promise<TModel>;

	delete(id: string): TModel | Promise<TModel>;
}
