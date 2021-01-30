import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ColumnSizes } from 'src/shared/constants';
import { BaseModel } from 'src/shared/models';

export type CurrencyDocument = Currency & Document;

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

export const currencySchema = SchemaFactory.createForClass(Currency);
