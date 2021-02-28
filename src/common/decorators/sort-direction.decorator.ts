import { Expose, Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { QueryPropsAndOptions } from '../constants';
import { IQueryOption } from '../interfaces';

export function QuerySortDirection(option: IQueryOption = {}) {
	const { key } = option;
	return function (target: any, propertyKey: string) {
		const exposedKey = key || propertyKey;

		Expose({ name: exposedKey })(target, propertyKey);
		IsOptional()(target, propertyKey);
		IsString()(target, propertyKey);
		IsIn(sortDirectionPropertyOptions)(target, propertyKey);

		Transform(({ obj, value }) => {
			value = value || 'false';

			if (!obj[QueryPropsAndOptions.SortProp]) {
				obj[QueryPropsAndOptions.SortProp] = {};
			}

			if (
				!obj[QueryPropsAndOptions.SortProp][QueryPropsAndOptions.SortDirectionProp] &&
				value
			) {
				obj[QueryPropsAndOptions.SortProp][
					QueryPropsAndOptions.SortDirectionProp
				] = sortDirectionPropertyTruthyOption.includes(value)
					? QueryPropsAndOptions.SortAscendingValue
					: QueryPropsAndOptions.SortDescendingValue;
			}

			delete obj[exposedKey];

			return String(value);
		})(target, propertyKey);
	};
}

const sortDirectionPropertyOptions = ['true', 'false', '1', '0'];
const sortDirectionPropertyTruthyOption = ['true', '1'];
