import { Exclude } from 'class-transformer';
import {
	QueryStringFilter,
	QuerySortDirection,
	QuerySortKey,
	QueryPaginatePage,
	QueryPaginatePageSize,
} from 'src/utility/decorators';

@Exclude()
export class CurrencyQueryDto {
	@QueryStringFilter()
	name: string;

	@QueryStringFilter()
	code: string;

	@QuerySortKey({ allowedProperties: ['name', 'code'] })
	sortBy: string;

	@QuerySortDirection()
	sortAscending: string;

	@QueryPaginatePage()
	page: number;

	@QueryPaginatePageSize()
	pageSize: number;
}
