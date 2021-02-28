import { Expose, Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { QueryPropsAndOptions } from '../constants';
import { IQueryOption } from '../interfaces';

export function QueryPaginatePageSize(option: IQueryOption = {}) {
	const { key } = option;
	return function (target: any, propertyKey: string) {
		const exposedKey = key || propertyKey;

		Expose({ name: exposedKey })(target, propertyKey);
		IsOptional()(target, propertyKey);
		IsNumber()(target, propertyKey);
		IsInt()(target, propertyKey);
		Min(QueryPropsAndOptions.PaginatePageSizeMin)(target, propertyKey);
		Max(QueryPropsAndOptions.PaginatePageSizeMax)(target, propertyKey);

		Transform(({ obj, value }) => {
			if (!obj[QueryPropsAndOptions.PaginateProp]) {
				obj[QueryPropsAndOptions.PaginateProp] = {};
			}

			if (
				!obj[QueryPropsAndOptions.PaginateProp][
					QueryPropsAndOptions.PaginatePageSizeProp
				] &&
				value
			) {
				obj[QueryPropsAndOptions.PaginateProp][
					QueryPropsAndOptions.PaginatePageSizeProp
				] = value;
			}

			delete obj[exposedKey];

			return value;
		})(target, propertyKey);
	};
}
