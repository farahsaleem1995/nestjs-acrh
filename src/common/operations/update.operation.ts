import { Injectable, Scope } from '@nestjs/common';
import { UpdateQuery } from 'mongoose';
import { BaseDocument, BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';
import { IOperation } from '../interfaces';

export interface UpdateArgs<
	TModel extends BaseModel,
	TUpdateDto extends UpdateQuery<BaseDocument<TModel>>
> {
	id: string;
	updateDto: TUpdateDto;
}

@Injectable({ scope: Scope.TRANSIENT })
export class UpdateOperation<
	TModel extends BaseModel,
	TUpdateDto = UpdateQuery<BaseDocument<TModel>>
> implements IOperation<TModel, TModel, UpdateArgs<TModel, TUpdateDto>> {
	async apply(
		repository: BaseRepository<TModel>,
		args: UpdateArgs<TModel, TUpdateDto>,
	): Promise<TModel> {
		const { id, updateDto } = args;

		const models = await repository.update(id, updateDto);

		return models;
	}
}
