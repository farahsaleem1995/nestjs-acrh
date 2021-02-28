import { DocumentType } from '@typegoose/typegoose';
import { CreateQuery, FilterQuery, UpdateQuery } from 'mongoose';
import { BaseModel } from '../models';

interface IFindQuery<TModel extends BaseModel> {
	filter: FilterQuery<TModel>;
	sort: {
		key: string;
		direction: -1 | 1;
	};
	paginate: {
		page: number;
		pageSize: number;
	};
}

type AppFindQuery<TModel extends BaseModel> = Partial<IFindQuery<TModel>>;

type AppUpdateQuery<TModel extends BaseModel> = {
	[property in keyof TModel]?: TModel[property];
} &
	UpdateQuery<DocumentType<TModel>>;

type AppCreateQuery<TModel extends BaseModel> = CreateQuery<TModel>;
