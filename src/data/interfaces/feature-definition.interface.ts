import { DiscriminatorOptions } from '@nestjs/mongoose';

export interface FeatureDefinition {
	connectionName?: string;
	collection?: string;
	discriminators?: DiscriminatorOptions[];
}
