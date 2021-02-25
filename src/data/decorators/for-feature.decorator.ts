import { ClassConstructor } from 'class-transformer';
import { TypegooseModule } from 'nestjs-typegoose';
import { DataFeature } from '../types';

export const mongooseFeatures: DataFeature[] = [];

export function ForFeature(connectionName?: string) {
	return function (ctr: ClassConstructor<any>) {
		const featureKey = ctr.name;

		if (!mongooseFeatures.map((feature) => feature.featureKey).includes(featureKey)) {
			const module = TypegooseModule.forFeature([ctr], connectionName);

			mongooseFeatures.push({ featureKey, module });
		}
	};
}
