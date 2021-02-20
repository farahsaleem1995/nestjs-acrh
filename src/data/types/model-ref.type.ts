import { Ref } from '.';
import { BaseModel } from '../models';

//---------------------------------------------------
export declare type ModelRefs<TModel extends BaseModel> = {
	[property in keyof TModel]?: boolean;
};
//---------------------------------------------------

//---------------------------------------------------
// export declare type ModelRefs<TModel extends BaseModel> = {
// 	[property in keyof TModel]?: boolean | ModelRefs<TModel[property]>;
// };
//---------------------------------------------------

//---------------------------------------------------
// eslint-disable-next-line @typescript-eslint/ban-types
// type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

// type ModelRefOptions<TModel extends BaseModel> = {
// 	[property in keyof TModel]?: boolean | ModelRefs<TModel[property]>;
// };

// export declare type ModelRefs<TModel extends ModelRefOptions<TModel>> = Pick<
// 	TModel,
// 	NonFunctionPropertyNames<TModel>
// >;
//---------------------------------------------------

//---------------------------------------------------
// export declare type ModelRefs<TModel extends string | BaseModel> = {
// 	[property in keyof TModel]?: TModel[property] extends Ref<BaseModel>
// 		? boolean | ModelRefs<TModel[property]>
// 		: never;
// };
//---------------------------------------------------
