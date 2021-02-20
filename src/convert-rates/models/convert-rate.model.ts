import * as mongoose from 'mongoose';
import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Currency } from 'src/currencies/models';
import { BaseDocument, BaseModel } from 'src/data/models';
import { Ref } from 'src/data/types';
import { ForFeatureAsync } from 'src/data/decorators';

const convertRateSchemaFactory = () => {
	const convertRateSchema = SchemaFactory.createForClass(ConvertRate);
	convertRateSchema.pre<BaseDocument<ConvertRate>>('save', function (next) {
		try {
			this.populate('fromCurrency').populate('toCurrency').execPopulate();
			next();
		} catch (err) {
			next(err);
		}
	});

	return convertRateSchema;
};

@ForFeatureAsync({ useFactory: convertRateSchemaFactory })
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
	@Type(() => Currency)
	fromCurrency: Ref<Currency>;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Currency.name,
		required: true,
	})
	@AutoMap(() => Currency)
	@Type(() => Currency)
	toCurrency: Ref<Currency>;

	@Prop({
		type: Number,
		required: true,
	})
	@AutoMap()
	convertRateValue: number;
}
