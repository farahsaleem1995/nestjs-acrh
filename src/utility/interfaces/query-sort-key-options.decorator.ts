import { IQueryOption } from './query-options.interface';

export interface IQuerySortKeyOption extends IQueryOption {
	allowedProperties: string[];
}
