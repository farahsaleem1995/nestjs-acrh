import { DynamicModule, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { InputValidationPipe } from './pipes';
import { BaseRepository } from './repositories';
import { DataFeatue } from './types';
import { createRepositoryProviders } from './utils';

@Module({})
export class SharedModule {
	private static modelDefinitions: ModelDefinition[] = [];

	static forFeature(features: DataFeatue[]): DynamicModule {
		this.modelDefinitions = features.map(
			(feature): ModelDefinition => {
				const { model, schema } = feature;

				return {
					name: model.name,
					schema: schema,
				};
			},
		);

		const repositoryProviders = createRepositoryProviders();

		return {
			module: SharedModule,
			imports: [MongooseModule.forFeature(this.modelDefinitions)],
			providers: [InputValidationPipe, BaseRepository, ...repositoryProviders],
			exports: [InputValidationPipe, BaseRepository, ...repositoryProviders],
		};
	}
}
