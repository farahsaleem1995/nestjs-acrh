import { DynamicModule, Global, Module } from '@nestjs/common';
import { mongooseFeatures } from './decorators';
import { Repository } from './repositories';
import { createRepositoryProviders } from './utils';

@Global()
@Module({})
export class DataCoreModule {
	static forRoot(): DynamicModule {
		const repositoryProviders = createRepositoryProviders();

		const module: DynamicModule = {
			module: DataCoreModule,
			imports: [...mongooseFeatures.map((feature) => feature.module)],
			providers: [Repository, ...repositoryProviders],
			exports: [Repository, ...repositoryProviders],
		};

		return module;
	}
}
