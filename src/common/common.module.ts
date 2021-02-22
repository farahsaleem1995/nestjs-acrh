import { DynamicModule, Module } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from 'src/data/models';
import { Operations } from './enums';
import { CreateOperation } from './operations';
import { BaseService } from './services';
import { getOperationToken, OperationFactory } from './utils';
import { createServiceProviders } from './utils/service-provider';

@Module({})
export class CommonModule {
	static forFeature(models: ClassConstructor<BaseModel>[]): DynamicModule {
		const serviceProviders = createServiceProviders(models);

		return {
			module: CommonModule,
			providers: [
				{
					provide: getOperationToken(Operations.Create),
					useClass: CreateOperation,
				},
				OperationFactory,
				BaseService,
				...serviceProviders,
			],
			exports: [...serviceProviders],
		};
	}
}
