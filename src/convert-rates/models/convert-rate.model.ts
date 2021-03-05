import { AutoMap } from '@automapper/classes';
import { prop, Ref } from '@typegoose/typegoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { Currency } from 'src/currencies/models';
import { ForFeature } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { UseMongoosePlugin } from 'src/common/decorators';
import { Resource } from 'src/roles/decorators';

@ForFeature()
@Resource()
@UseMongoosePlugin()
@Exclude()
export class ConvertRate extends BaseModel {
	@prop({
		ref: () => Currency,
		required: true,
		autopopulate: true,
	})
	@Expose()
	@AutoMap(() => Currency)
	@Type(() => Currency)
	fromCurrency: Ref<Currency>;

	@prop({
		ref: () => Currency,
		required: true,
		autopopulate: true,
	})
	@Expose()
	@AutoMap(() => Currency)
	@Type(() => Currency)
	toCurrency: Ref<Currency>;

	@prop({
		required: true,
	})
	@Expose()
	@AutoMap()
	convertRateValue: number;
}
