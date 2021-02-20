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
			const query = this._model.find(filter);

			const model = refs ? await this._populateQueryRefs(query, refs) : await query.exec();

			return this._toClassArray(model);
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	async findOne(filter: FilterQuery<BaseDocument<TModel>>, refs?: TRefs): Promise<TModel> {
		try {
			const query = this._model.findOne(filter);

			const model = refs ? await this._populateQueryRefs(query, refs) : await query.exec();

			return this._toClassObject(model.toObject());
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	async findById(id: string, refs?: ModelRefs<TModel>): Promise<TModel> {
		try {
			const query = this._model.findById(BaseRepository._toObjectId(id));

			const model = refs ? await this._populateQueryRefs(query, refs) : await query.exec();

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

	async update(
		id: string,
		item: UpdateQuery<BaseDocument<TModel>>,
		refs?: ModelRefs<TModel>,
	): Promise<TModel> {
		try {
			const query = this._model.findByIdAndUpdate(BaseRepository._toObjectId(id), item, {
				new: true,
			});

			const model = refs ? await this._populateQueryRefs(query, refs) : await query.exec();

			return this._toClassObject(model.toObject());
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	async delete(id: string, refs?: ModelRefs<TModel>): Promise<TModel> {
		try {
			const query = this._model.findByIdAndDelete(BaseRepository._toObjectId(id));

			const model = refs ? await this._populateQueryRefs(query, refs) : await query.exec();

			return this._toClassObject(model.toObject());
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	private async _populateQueryRefs<
		TResultType extends BaseDocument<TModel> | BaseDocument<TModel>[]
	>(
		query: Query<TResultType, BaseDocument<TModel>>,
		refs: ModelRefs<TModel>,
	): Promise<TResultType> {
		const refKeys = this._getRefKeys(refs);

		refKeys.forEach((key) => {
			query = query.populate(key);
		});

		return await query.exec();
	}

	private _getRefKeys(refs: any): string[] {
		const keys: string[] = [];

		Object.entries(refs).forEach(([refKey, refValue]) => {
			if (refValue === true) {
				keys.push(refKey);
			} else if (refValue !== false) {
				const subKeys = this._getRefKeys(refValue);

				subKeys.forEach((subKey) => {
					keys.push(`${refKey}.${subKey}`);
				});
			}
		});

		return keys;
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
