import { FilterQuery } from 'mongoose';
import { BaseModel } from '../models';

interface IDataQuery<TModel extends BaseModel> {
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

export type DataQuery<TModel extends BaseModel> = Partial<IDataQuery<TModel>>;
