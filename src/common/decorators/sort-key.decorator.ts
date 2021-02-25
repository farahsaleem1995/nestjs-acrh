import { Expose, Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { QueryProps } from '../../common/constants';
import { IQuerySortKeyOption } from '../interceptors';

export function QuerySortKey(option: IQuerySortKeyOption) {
	const { key, allowedProperties } = option;
	return function (target: any, propertyKey: string) {
		const exposedKey = key || propertyKey;

		Expose({ name: exposedKey })(target, propertyKey);
		IsOptional()(target, propertyKey);
		IsString()(target, propertyKey);
		IsIn(allowedProperties)(target, propertyKey);

		Transform(({ obj, value }) => {
			if (!obj[QueryProps.SortProp]) {
				obj[QueryProps.SortProp] = {};
			}

			if (!obj[QueryProps.SortProp][QueryProps.SortKeyProp] && value) {
				obj[QueryProps.SortProp][QueryProps.SortKeyProp] = value;
			}

			delete obj[exposedKey];

			return value;
		})(target, propertyKey);
	};
}
