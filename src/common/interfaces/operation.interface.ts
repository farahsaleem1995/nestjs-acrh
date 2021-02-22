import { BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';

export interface IOperation<
	TModel extends BaseModel,
	TArgs,
	TResultType extends BaseModel | BaseModel[]
> {
	apply(repository: BaseRepository<TModel>, args: TArgs): TResultType | Promise<TResultType>;
}
