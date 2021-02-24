import { Expose, Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { QueryProps } from '../enums';
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

			if (!obj[QueryProps.SortProp]) {
				obj[QueryProps.SortProp] = {};
			}

			if (!obj[QueryProps.SortProp][QueryProps.SortDirectionProp] && value) {
				obj[QueryProps.SortProp][
					QueryProps.SortDirectionProp
				] = sortDirectionPropertyTruthyOption.includes(value)
					? QueryProps.SortAscendingValue
					: QueryProps.SortDescendingValue;
			}

			delete obj[exposedKey];

			return String(value);
		})(target, propertyKey);
	};
}

const sortDirectionPropertyOptions = ['true', 'false', '1', '0'];
const sortDirectionPropertyTruthyOption = ['true', '1'];
