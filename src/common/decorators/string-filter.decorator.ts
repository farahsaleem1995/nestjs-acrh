import { Expose, Transform } from 'class-transformer';
import { isNotEmptyObject, IsOptional, IsString } from 'class-validator';
import { QueryPropsAndOptions } from '../constants';
import { IQueryOption } from '../interfaces';

export function QueryStringFilter(option: IQueryOption = {}) {
	const { key } = option;
	return function (target: any, propertyKey: string) {
		const exposedKey = key || propertyKey;

		Expose({ name: exposedKey })(target, propertyKey);
		IsOptional()(target, propertyKey);
		IsString()(target, propertyKey);

		Transform(({ obj, value, key }) => {
			if (!obj[QueryPropsAndOptions.FilterProp]) {
				obj[QueryPropsAndOptions.FilterProp] = {};
			}

			const filter = value
				? { $regex: new RegExp(`.*${value.split('').join('.*')}.*`, 'i') }
				: {};

			if (!obj[QueryPropsAndOptions.FilterProp][key] && isNotEmptyObject(filter)) {
				obj[QueryPropsAndOptions.FilterProp][key] = filter;
			}

			delete obj[exposedKey];

			return value;
		})(target, propertyKey);
	};
}
