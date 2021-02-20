import { Schema } from 'mongoose';
import { Ref } from '.';
import { BaseModel } from '../models';

export declare type ModelRefs<TModel extends Schema.Types.ObjectId | BaseModel> = {
	[property in keyof TModel]?: TModel[property] extends Ref<BaseModel>
		? boolean | ModelRefs<TModel[property]>
		: never;
};
