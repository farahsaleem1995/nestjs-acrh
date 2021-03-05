import { BaseModel } from 'src/data/models';

export interface IExistenceValidationOptions<TModel extends BaseModel> {
	transform?: boolean;
	validationProperty?: keyof TModel;
}
