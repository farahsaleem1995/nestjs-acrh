import { ClassConstructor } from 'class-transformer';
import { BaseModel } from '../models';

export const repositoryTokenKeyword = 'Repository';

export function getRepositoryToken<TModel extends BaseModel>(
	model: ClassConstructor<TModel>,
): string {
	const modelName = model.name;

	return `${modelName}${repositoryTokenKeyword}`;
}
