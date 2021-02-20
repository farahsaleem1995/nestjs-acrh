import { AutoMap } from '@automapper/classes';
import { Prop, Schema } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { ColumnSizes } from 'src/data/constants';
import { ForFeature } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';

@ForFeature()
@Schema({
	timestamps: true,
	id: true,
	toJSON: {
		getters: true,
		virtuals: true,
	},
	toObject: {
		getters: true,
		virtuals: true,
	},
})
export class Currency extends BaseModel {
	@Prop({
		type: String,
		required: true,
		minlength: ColumnSizes.Length4,
		maxlength: ColumnSizes.Length32,
	})
	@AutoMap()
	name: string;

	@Prop({
		type: String,
		required: true,
		minlength: ColumnSizes.Length2,
		maxlength: ColumnSizes.Length4,
	})
	@AutoMap()
	code: string;

	@Prop({
		type: String,
		required: true,
		minlength: ColumnSizes.Length1,
		maxlength: ColumnSizes.Length2,
	})
	@AutoMap()
	symbol: string;
}
