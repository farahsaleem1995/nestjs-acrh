import { Injectable, Scope } from '@nestjs/common';
import { BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';
import { IOperation } from '../interfaces';

export interface UpdateArgs<TUpdateDto> {
	id: string;
	updateDto: TUpdateDto;
}

@Injectable({ scope: Scope.TRANSIENT })
export class UpdateOperation<TModel extends BaseModel, TArgs extends UpdateArgs<any>>
	implements IOperation<TModel, TModel, UpdateArgs<any>> {
	async apply(repository: BaseRepository<TModel>, args: TArgs): Promise<TModel> {
		const { id, updateDto } = args;

		const models = await repository.update(id, updateDto);

		return models;
	}
}
