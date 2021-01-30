import { ClassConstructor } from 'class-transformer';
import { FilterQuery, PopulateOptions } from 'mongoose';

import { IBaseQuery } from '.';

export interface IDbQuery {
	query: IDbFindManyQuery | IDbFindOneQuery | IDbAggregateQuery;
	queryType: QueryTypes;
}

export interface IDbFindManyQuery {
	criteria?: FilterQuery<any>;
	options?: IBaseQuery;
	references?: PopulateOptions[];
}

export interface IDbFindOneQuery {
	criteria?: FilterQuery<any>;
	references?: PopulateOptions[];
}

export interface IDbAggregateQuery {
	pipeline?: any[];
	resultType?: ClassConstructor<any>;
}

export enum QueryTypes {
	FIND = 1,
	AGGREGATE = 2,
}
