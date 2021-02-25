import { AutoMap } from '@automapper/classes';
import { prop } from '@typegoose/typegoose';
import { UseMongoosePlugin } from 'src/common/decorators';
import { ColumnSizes } from 'src/data/constants';
import { ForFeature } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';

@ForFeature()
@UseMongoosePlugin()
export class Currency extends BaseModel {
	@prop({
		required: true,
		minlength: ColumnSizes.Length4,
		maxlength: ColumnSizes.Length32,
	})
	@AutoMap()
	name: string;

	@prop({
		required: true,
		minlength: ColumnSizes.Length2,
		maxlength: ColumnSizes.Length4,
	})
	@AutoMap()
	code: string;

	@prop({
		required: true,
		minlength: ColumnSizes.Length1,
		maxlength: ColumnSizes.Length2,
	})
	@AutoMap()
	symbol: string;
}
