import { Injectable, InternalServerErrorException, Scope } from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import { MongoError } from 'mongodb';
import {
	Types,
	UpdateQuery,
	FilterQuery,
	DocumentQuery,
	QueryFindOneAndUpdateOptions,
	Query,
} from 'mongoose';
import { BaseModel } from '../models';
import {
	CreateOneQuery,
	FindAllQuery,
	FindOneQuery,
	ModelType,
	UpdateOneQuery,
	UpdateOneQueryOptions,
} from '../types';

type QueryList<T extends BaseModel> = DocumentQuery<Array<DocumentType<T>>, DocumentType<T>>;
type QueryItem<T extends BaseModel> = DocumentQuery<DocumentType<T>, DocumentType<T>>;

interface IQueryOptions {
	lean?: boolean;
	autopopulate?: boolean;
}

@Injectable({ scope: Scope.TRANSIENT })
export class BaseRepository<TModel extends BaseModel> {
	private _model: ModelType<TModel>;

	public setModel(model: ModelType<TModel>): void {
		this._model = model;
	}

	public getModelName(): string {
		return this._model.modelName;
	}

	public async findAll(query: FindAllQuery<TModel> = {}): Promise<TModel[]> {
		const { filter, sort, paginate } = query;
		const sortObject = sort ? { [sort.key]: sort.direction } : {};
		const skip =
			paginate?.page && paginate?.pageSize ? paginate.pageSize * (paginate.page - 1) : 0;
		const limit = paginate?.pageSize ? paginate.pageSize : 10;

		try {
			const query = this._findAll(filter, { autopopulate: true, lean: true })
				.sort(sortObject)
				.skip(skip)
				.limit(limit);

			const model = await query.exec();

			return model;
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	public async findOne(filter: FindOneQuery<TModel>): Promise<TModel> {
		try {
			const query = this._findOne(<any>filter);

			const model = await query.exec();

			return model;
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	public async findById(id: string): Promise<TModel> {
		try {
			const query = this._findById(id);

			const model = await query.exec();

			return model;
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	public async create(item: CreateOneQuery<TModel>): Promise<TModel> {
		try {
			return await this._model.create(item);
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	public async update(
		updateQuery: UpdateOneQuery<TModel>,
		options?: IQueryOptions,
	): Promise<TModel> {
		try {
			const { item } = updateQuery;
			const query = this._model
				.findByIdAndUpdate(Types.ObjectId(item.id), { $set: updateQuery } as any, {
					omitUndefined: true,
					new: true,
				})
				.setOptions(BaseRepository._getQueryOptions(options));

			const model = await query.exec();

			return model;
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	public async updateById(
		id: string,
		updateQuery: UpdateOneQuery<TModel>,
		updateOptions: UpdateOneQueryOptions = {},
		options?: IQueryOptions,
	): Promise<TModel> {
		const { item } = updateQuery;

		const query = this._update(
			{ _id: Types.ObjectId(id) as any },
			item as any,
			updateOptions,
			options,
		);

		const model = await query.exec();

		return model;
	}

	public async updateByFilter(
		filter: FindOneQuery<TModel> = {},
		updateQuery: UpdateOneQuery<TModel>,
		updateOptions: UpdateOneQueryOptions = {},
		options?: IQueryOptions,
	): Promise<TModel> {
		const query = this._update(filter, updateQuery as any, updateOptions, options);

		const model = await query.exec();

		return model;
	}

	public async deleteById(id: string, options?: IQueryOptions): Promise<TModel> {
		try {
			const query = this._delete({ _id: Types.ObjectId(id) as any }, options);

			const model = await query.exec();

			return model;
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	public async count(filter: FindOneQuery<TModel> = {}): Promise<number> {
		try {
			return await this._count(filter);
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	public async exists(filter: FindOneQuery<TModel> = {}): Promise<boolean> {
		try {
			return await this._model.exists(filter);
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	private _findAll(filter: any = {}, options?: IQueryOptions): QueryList<TModel> {
		return this._model.find(filter).setOptions(BaseRepository._getQueryOptions(options));
	}

	private _findOne(filter: any = {}, options?: IQueryOptions): QueryItem<TModel> {
		return this._model.findOne(filter).setOptions(BaseRepository._getQueryOptions(options));
	}

	private _findById(id: string, options?: IQueryOptions): QueryItem<TModel> {
		return this._model
			.findById(BaseRepository._toObjectId(id))
			.setOptions(BaseRepository._getQueryOptions(options));
	}

	private _update(
		filter: FindOneQuery<TModel> = {},
		updateQuery: UpdateQuery<DocumentType<TModel>>,
		updateOptions: QueryFindOneAndUpdateOptions = {},
		options?: IQueryOptions,
	): QueryItem<TModel> {
		return this._model
			.findOneAndUpdate(filter, updateQuery, {
				...Object.assign({ omitUndefined: true }, updateOptions),
				new: true,
			})
			.setOptions(BaseRepository._getQueryOptions(options));
	}

	private _delete(
		filter: FilterQuery<DocumentType<TModel>> = {},
		options?: IQueryOptions,
	): QueryItem<TModel> {
		return this._model
			.findOneAndDelete(filter)
			.setOptions(BaseRepository._getQueryOptions(options));
	}

	private _count(filter: FilterQuery<DocumentType<TModel>> = {}): Query<number> {
		return this._model.count(filter);
	}

	private static get defaultOptions(): IQueryOptions {
		return { lean: true, autopopulate: true };
	}

	private static _getQueryOptions(options?: IQueryOptions) {
		const mergedOptions = {
			...BaseRepository.defaultOptions,
			...(options || {}),
		};
		const option = mergedOptions.lean ? { virtuals: true } : null;

		if (option && mergedOptions.autopopulate) {
			option['autopopulate'] = true;
		}

		return { lean: option, autopopulate: mergedOptions.autopopulate };
	}

	private static _throwMongoError(err: MongoError): void {
		throw new InternalServerErrorException(err, err.errmsg);
	}

	private static _toObjectId(id: string): Types.ObjectId {
		try {
			return Types.ObjectId(id);
		} catch (e) {
			this._throwMongoError(e);
		}
	}
}
