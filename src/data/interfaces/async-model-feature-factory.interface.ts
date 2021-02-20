import { ModelDefinition } from '@nestjs/mongoose';
export interface AsyncModelFeatureFactory {
	connectionName?: string;
	useFactory: (...args: any[]) => ModelDefinition['schema'] | Promise<ModelDefinition['schema']>;
	inject?: any[];
}
