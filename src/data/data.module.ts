import { DynamicModule, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { InputValidationPipe } from './pipes';
import { BaseRepository } from './repositories';
import { DataFeatue } from './types';
import { createRepositoryProviders } from './utils';

@Module({})
export class DataModule {
	private static modelDefinitions: ModelDefinition[] = [];

	static forRoot(): DynamicModule {
		return {
			module: DataModule,
			imports: [
				MongooseModule.forRoot('mongodb://localhost:27017/new-arch', {
					useFindAndModify: false,
					useNewUrlParser: true,
					useUnifiedTopology: true,
				}),
			],
		};
	}

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
			module: DataModule,
			imports: [MongooseModule.forFeature(this.modelDefinitions)],
			providers: [InputValidationPipe, BaseRepository, ...repositoryProviders],
			exports: [InputValidationPipe, BaseRepository, ...repositoryProviders],
		};
	}
}
