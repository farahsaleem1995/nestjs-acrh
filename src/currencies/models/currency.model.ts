import { AutoMap } from '@automapper/classes';
import { prop } from '@typegoose/typegoose';
import { Exclude, Expose } from 'class-transformer';
import { ColumnSizes } from 'src/data/constants';
import { ForFeature } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { CaslSubject } from 'src/permissions/decorators';
import { currencyActions } from '../constants';

@ForFeature()
@CaslSubject(currencyActions)
@Exclude()
export class Currency extends BaseModel {
	@prop({
		required: true,
		minlength: ColumnSizes.Length4,
		maxlength: ColumnSizes.Length32,
	})
	@Expose()
	@AutoMap()
	name: string;

	@prop({
		required: true,
		minlength: ColumnSizes.Length2,
		maxlength: ColumnSizes.Length4,
	})
	@Expose()
	@AutoMap()
	code: string;

	@prop({
		required: true,
		minlength: ColumnSizes.Length1,
		maxlength: ColumnSizes.Length2,
	})
	@Expose()
	@AutoMap()
	symbol: string;
}
