import { mixin, NotFoundException, PipeTransform } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { InjectRepository } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { Repository } from 'src/data/repositories';
import { IExistenceValidationOptions } from '../interfaces';

export function ExistenceValidationPipe<TModel extends BaseModel>(
	modelCtr: ClassConstructor<TModel>,
	options: IExistenceValidationOptions<TModel> = {},
) {
	class ExistenceValidationPipe implements PipeTransform<any, Promise<TModel>> {
		private static get defaultOptions(): IExistenceValidationOptions<TModel> {
			return { transform: false, validationProperty: 'id' };
		}

		constructor(@InjectRepository(modelCtr) private readonly repository: Repository<TModel>) {}

		async transform(value: any): Promise<any> {
			const pipeOptions = ExistenceValidationPipe._getOptions(options);
			const model = pipeOptions.validationProperty
				? await this.repository.findById(value)
				: await this.repository.findOne({ [pipeOptions.validationProperty]: value } as any);

			if (!model) {
				throw new NotFoundException(`${modelCtr.name} not found.`);
			}

			return pipeOptions.transform ? model : value;
		}

		private static _getOptions(options?: IExistenceValidationOptions<TModel>) {
			const mergedOptions = {
				...this.defaultOptions,
				...(options || {}),
			};

			return mergedOptions;
		}
	}

	return mixin(ExistenceValidationPipe);
}
