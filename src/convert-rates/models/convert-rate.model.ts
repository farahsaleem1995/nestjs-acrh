import * as mongoose from 'mongoose';
import { AutoMap } from '@automapper/classes';
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { Currency } from 'src/currencies/models';
import { BaseModel } from 'src/data/models';
import { Ref } from 'src/data/types';

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
export class ConvertRate extends BaseModel {
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Currency.name,
		required: true,
	})
	@AutoMap(() => Currency)
	@Expose()
	@Type(() => Currency)
	fromCurrency: Ref<Currency>;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Currency.name,
		required: true,
	})
	@AutoMap(() => Currency)
	@Expose()
	@Type(() => Currency)
	toCurrency: Ref<Currency>;

	@Prop({
		type: Number,
		required: true,
	})
	@AutoMap()
	@Expose()
	convertRateValue: number;
}

export const convertRateSchema = SchemaFactory.createForClass(ConvertRate);

export const convertRateModel = MongooseModule.forFeature([
	{ name: ConvertRate.name, schema: convertRateSchema },
]);
