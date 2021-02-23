import { Injectable, Scope } from '@nestjs/common';
import { BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';
import { IOperation } from '../interfaces';

export interface CreateArgs<TModel extends BaseModel, TCreateDto extends Partial<TModel>> {
	createDto: TCreateDto;
}

@Injectable({ scope: Scope.TRANSIENT })
export class CreateOperation<TModel extends BaseModel, TCreateDTo = Partial<TModel>>
	implements IOperation<TModel, TModel, CreateArgs<TModel, TCreateDTo>> {
	async apply(
		repository: BaseRepository<TModel>,
		args: CreateArgs<TModel, TCreateDTo>,
	): Promise<TModel> {
		const { createDto } = args;

		const createdModel = await repository.create(createDto);

		return createdModel;
	}
}
