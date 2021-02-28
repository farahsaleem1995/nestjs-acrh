import { Expose, Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { QueryPropsAndOptions } from '../constants';
import { IQuerySortKeyOption } from '../interfaces';

export function QuerySortKey(option: IQuerySortKeyOption) {
	const { key, allowedProperties } = option;
	return function (target: any, propertyKey: string) {
		const exposedKey = key || propertyKey;

		Expose({ name: exposedKey })(target, propertyKey);
		IsOptional()(target, propertyKey);
		IsString()(target, propertyKey);
		IsIn(allowedProperties)(target, propertyKey);

		Transform(({ obj, value }) => {
			if (!obj[QueryPropsAndOptions.SortProp]) {
				obj[QueryPropsAndOptions.SortProp] = {};
			}

			if (!obj[QueryPropsAndOptions.SortProp][QueryPropsAndOptions.SortKeyProp] && value) {
				obj[QueryPropsAndOptions.SortProp][QueryPropsAndOptions.SortKeyProp] = value;
			}

			delete obj[exposedKey];

			return value;
		})(target, propertyKey);
	};
}
