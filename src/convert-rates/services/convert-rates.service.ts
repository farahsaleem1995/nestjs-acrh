import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/services';
import { ConvertRate } from '../models';

@Injectable()
export class ConvertRatesService extends CrudService(ConvertRate) {}
