import { mixin, NotFoundException, PipeTransform } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { InjectRepository } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { Repository } from 'src/data/repositories';

export function ExistenceValidationPipe<TModel extends BaseModel>(
	modelCtr: ClassConstructor<TModel>,
) {
	class ExistenceValidationPipe implements PipeTransform<any, Promise<TModel>> {
		constructor(@InjectRepository(modelCtr) private readonly repository: Repository<TModel>) {}

		async transform(value: any): Promise<any> {
			const model = await this.repository.findById(value);

			if (!model) {
				throw new NotFoundException(`${modelCtr.name} not found.`);
			}

			return value;
		}
	}

	return mixin(ExistenceValidationPipe);
}
