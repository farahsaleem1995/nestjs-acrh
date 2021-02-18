import { Injectable, InternalServerErrorException, Scope } from '@nestjs/common';
import { plainToClass, ClassConstructor } from 'class-transformer';
import { MongoError } from 'mongodb';
import { Types, Model, UpdateQuery, FilterQuery, Query } from 'mongoose';
import { BaseModel } from '../models';
import { BaseDocument, ModelRefs } from '../types';

@Injectable({ scope: Scope.TRANSIENT })
export class BaseRepository<TModel extends BaseModel, TRefs extends ModelRefs<TModel>> {
	private _modelType: ClassConstructor<TModel>;
	private _model: Model<BaseDocument<TModel>>;

	setModel(model: Model<BaseDocument<TModel>>): void {
		this._model = model;
	}

	createModel(doc?: Partial<TModel>): BaseDocument<TModel> {
		return new this._model(doc);
	}

	async findAll(filter: FilterQuery<BaseDocument<TModel>>, refs?: TRefs): Promise<TModel[]> {
		try {
			let query = this._model.find(filter);

			if (refs) {
				query = this._populateRefs(query, refs);
			}

			const model = await query.exec();

			return this._toClassArray(model);
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	async findOne(filter: FilterQuery<BaseDocument<TModel>>): Promise<TModel> {
		try {
			const model = await this._model.findOne(filter).exec();

			return this._toClassObject(model.toObject());
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	async findById(id: string): Promise<TModel> {
		try {
			const model = await this._model.findById(BaseRepository._toObjectId(id)).exec();

			return this._toClassObject(model.toObject());
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	async create(item: Partial<TModel>): Promise<TModel> {
		const doc = this.createModel(item);

		try {
			const model = await doc.save();

			return this._toClassObject(model.toObject());
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	async update(id: string, item: UpdateQuery<BaseDocument<TModel>>): Promise<TModel> {
		try {
			const model = await this._model
				.findByIdAndUpdate(BaseRepository._toObjectId(id), item, { new: true })
				.exec();

			return this._toClassObject(model.toObject());
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	async delete(id: string): Promise<TModel> {
		try {
			const model = await this._model
				.findByIdAndDelete(BaseRepository._toObjectId(id))
				.exec();

			return this._toClassObject(model.toObject());
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	private _populateRefs<TResultType extends BaseDocument<TModel> | BaseDocument<TModel>[]>(
		query: Query<TResultType, BaseDocument<TModel>>,
		refs: ModelRefs<TModel>,
	): Query<TResultType, BaseDocument<TModel>> {
		Object.entries(refs).forEach(([refKey, refValue]) => {
			if (!!refValue) {
				query = query.populate(refKey.toString());
			}
		});

		return query;
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

	private _toClassObject(obj: any): TModel {
		return plainToClass(this._modelType, obj, { enableCircularCheck: true });
	}

	private _toClassArray(obj: any[]): TModel[] {
		return plainToClass(this._modelType, obj, { enableCircularCheck: true });
	}
}
