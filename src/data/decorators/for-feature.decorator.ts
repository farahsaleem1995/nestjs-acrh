import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { ClassConstructor } from 'class-transformer';
import { FeatureDefinition } from '../interfaces';
import { MongooseFeature } from '../types';

export const mongooseFeatures: MongooseFeature[] = [];

export function ForFeature(featureDefinition: FeatureDefinition = {}) {
	return function (ctr: ClassConstructor<any>) {
		const featureKey = ctr.name;
		const featureSchema = SchemaFactory.createForClass(ctr);

		const { connectionName, ...restFeatureDefinition } = featureDefinition;

		if (!mongooseFeatures.map((feature) => feature.featureKey).includes(featureKey)) {
			const module = MongooseModule.forFeature(
				[{ name: featureKey, schema: featureSchema, ...restFeatureDefinition }],
				connectionName,
			);

			mongooseFeatures.push({ featureKey, module });
		}
	};
}
