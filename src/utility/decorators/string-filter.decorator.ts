import { Expose, Transform } from 'class-transformer';
import { isNotEmptyObject, IsOptional, IsString } from 'class-validator';
import { QueryProps } from '../enums';
import { IQueryOption } from '../interfaces';

export function QueryStringFilter(option: IQueryOption = {}) {
	const { key } = option;
	return function (target: any, propertyKey: string) {
		const exposedKey = key || propertyKey;

		Expose({ name: exposedKey })(target, propertyKey);
		IsOptional()(target, propertyKey);
		IsString()(target, propertyKey);

		Transform(({ obj, value, key }) => {
			if (!obj[QueryProps.FilterProp]) {
				obj[QueryProps.FilterProp] = {};
			}

			const filter = value
				? { $regex: new RegExp(`.*${value.split('').join('.*')}.*`, 'i') }
				: {};

			if (!obj[QueryProps.FilterProp][key] && isNotEmptyObject(filter)) {
				obj[QueryProps.FilterProp][key] = filter;
			}

			delete obj[exposedKey];

			return value;
		})(target, propertyKey);
	};
}
