import { DocumentType } from '@typegoose/typegoose';
import { CreateQuery, FilterQuery, QueryFindOneAndUpdateOptions, UpdateQuery } from 'mongoose';
import { SortDirections } from '../constants';
import { BaseModel } from '../models';

interface ISortQuery {
	key: string;
	direction: SortDirections;
}

interface IPaginateQuery {
	page: number;
	pageSize: number;
}

export type SortQuery = ISortQuery;

export type PaginateQuery = IPaginateQuery;

export type FindAllQuery<TModel extends BaseModel> = {
	filter?: FilterQuery<DocumentType<TModel>>;
} & {
	sort?: SortQuery;
} & { paginate?: PaginateQuery };

export type FindOneQuery<TModel extends BaseModel> = FindAllQuery<DocumentType<TModel>>['filter'];

export type CreateOneQuery<TModel extends BaseModel> = CreateQuery<DocumentType<TModel>>;

export type CreateManyQuery<TModel extends BaseModel> = CreateQuery<DocumentType<TModel>>[];

export type UpdateOneQuery<TModel extends BaseModel> = UpdateQuery<DocumentType<TModel>>;

export type UpdateOneQueryOptions = QueryFindOneAndUpdateOptions & { multi?: boolean };
