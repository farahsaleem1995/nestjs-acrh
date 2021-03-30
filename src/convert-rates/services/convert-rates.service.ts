import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/services';
import { ConvertRate } from '../models';

export const createConvertRatesStrategyToken = Symbol('createConvertRatesStrategy');
export const getAllConvertRatesStrategyToken = Symbol('getAllConvertRatesStrategy');
export const getByIdConvertRatesStrategyToken = Symbol('getByIdConvertRatesStrategy');
export const updateConvertRatesStrategyToken = Symbol('updateConvertRatesStrategy');
export const deleteConvertRatesStrategyToken = Symbol('deleteConvertRatesStrategy');

@Injectable()
export class ConvertRatesService extends CrudService(ConvertRate, {
	createStrategy: createConvertRatesStrategyToken,
	getAllStrategy: getAllConvertRatesStrategyToken,
	getByIdStrategy: getByIdConvertRatesStrategyToken,
	updateStrategy: updateConvertRatesStrategyToken,
	deleteStrategy: deleteConvertRatesStrategyToken,
}) {}
