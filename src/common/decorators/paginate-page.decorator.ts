import { Expose, Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { QueryPropsAndOptions } from '../constants';
import { IQueryOption } from '../interfaces';

export function QueryPaginatePage(option: IQueryOption = {}) {
	const { key } = option;
	return function (target: any, propertyKey: string) {
		const exposedKey = key || propertyKey;

		Expose({ name: exposedKey })(target, propertyKey);
		IsOptional()(target, propertyKey);
		IsNumber()(target, propertyKey);
		IsInt()(target, propertyKey);
		Min(QueryPropsAndOptions.PaginatePageMin)(target, propertyKey);
		Max(QueryPropsAndOptions.PaginatePageMax)(target, propertyKey);

		Transform(({ obj, value }) => {
			if (!obj[QueryPropsAndOptions.PaginateProp]) {
				obj[QueryPropsAndOptions.PaginateProp] = {};
			}

			if (
				!obj[QueryPropsAndOptions.PaginateProp][QueryPropsAndOptions.PaginatePageProp] &&
				value
			) {
				obj[QueryPropsAndOptions.PaginateProp][
					QueryPropsAndOptions.PaginatePageProp
				] = value;
			}

			delete obj[exposedKey];

			return value;
		})(target, propertyKey);
	};
}
