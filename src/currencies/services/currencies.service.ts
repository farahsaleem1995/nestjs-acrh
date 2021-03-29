import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/services';
import { Currency } from '../models';

@Injectable()
export class CurrenciesService extends CrudService(Currency) {}
