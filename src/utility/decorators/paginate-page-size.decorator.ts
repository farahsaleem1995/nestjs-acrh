import { Expose, Transform, Type } from 'class-transformer';
import { IsInt, IsNumber, IsNumberString, IsOptional, Max, Min } from 'class-validator';
import { QueryProps } from '../enums';
import { IQueryOption } from '../interfaces';

export function QueryPaginatePageSize(option: IQueryOption = {}) {
	const { key } = option;
	return function (target: any, propertyKey: string) {
		const exposedKey = key || propertyKey;

		Expose({ name: exposedKey })(target, propertyKey);
		IsOptional()(target, propertyKey);
		IsNumber()(target, propertyKey);
		IsInt()(target, propertyKey);
		Min(5)(target, propertyKey);
		Max(100)(target, propertyKey);

		Transform(({ obj, value }) => {
			if (!obj[QueryProps.PaginateProp]) {
				obj[QueryProps.PaginateProp] = {};
			}

			if (!obj[QueryProps.PaginateProp][QueryProps.PaginatePageSizeProp] && value) {
				obj[QueryProps.PaginateProp][QueryProps.PaginatePageSizeProp] = value;
			}

			delete obj[exposedKey];

			return value;
		})(target, propertyKey);
	};
}
