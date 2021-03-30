import { Injectable } from '@nestjs/common';
import { ICreateStrategy } from 'src/common/interfaces';
import { CrudService } from 'src/common/services';
import { CreateOneParamDto } from 'src/common/types';
import { InjectRepository } from 'src/data/decorators';
import { Repository } from 'src/data/repositories';
import { Currency } from '../models';

export const createCurrenciesStrategyToken = Symbol('createCurrenciesStrategy');
export const getAllCurrenciesStrategyToken = Symbol('getAllCurrenciesStrategy');
export const getByIdCurrenciesStrategyToken = Symbol('getByIdCurrenciesStrategy');
export const updateCurrenciesStrategyToken = Symbol('updateCurrenciesStrategy');
export const deleteCurrenciesStrategyToken = Symbol('deleteCurrenciesStrategy');

@Injectable()
export class CreateCurrencyStrategy implements ICreateStrategy<Currency> {
	constructor(@InjectRepository(Currency) private readonly repository: Repository<Currency>) {}

	create(createDto: CreateOneParamDto<Currency>): Currency | Promise<Currency> {
		return this.repository.create(createDto);
	}
}

export class CurrenciesService extends CrudService(Currency, {
	createStrategy: CreateCurrencyStrategy,
	getAllStrategy: getAllCurrenciesStrategyToken,
	getByIdStrategy: getByIdCurrenciesStrategyToken,
	updateStrategy: updateCurrenciesStrategyToken,
	deleteStrategy: deleteCurrenciesStrategyToken,
}) {}
