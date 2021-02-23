import { Injectable, Scope } from '@nestjs/common';
import { BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';
import { IOperation } from '../interfaces';

export interface GetByIdArgs {
	id: string;
}

@Injectable({ scope: Scope.TRANSIENT })
export class GetByIdOperation<TModel extends BaseModel>
	implements IOperation<TModel, TModel, GetByIdArgs> {
	async apply(repository: BaseRepository<TModel>, args: GetByIdArgs): Promise<TModel> {
		const { id } = args;

		const model = await repository.findById(id);

		return model;
	}
}
