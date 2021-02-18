import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ColumnSizes } from 'src/data/constants';
import { BaseModel } from 'src/data/models';

@Exclude()
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
	@Expose()
	name: string;

	@Prop({
		type: String,
		required: true,
		minlength: ColumnSizes.Length2,
		maxlength: ColumnSizes.Length4,
	})
	@AutoMap()
	@Expose()
	code: string;

	@Prop({
		type: String,
		required: true,
		minlength: ColumnSizes.Length1,
		maxlength: ColumnSizes.Length2,
	})
	@AutoMap()
	@Expose()
	symbol: string;
}

export const currencySchema = SchemaFactory.createForClass(Currency);
