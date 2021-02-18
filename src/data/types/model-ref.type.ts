import { BaseModel } from '../models';

export declare type ModelRefs<TModel extends BaseModel> = {
	[property in keyof TModel]?: boolean;
};
