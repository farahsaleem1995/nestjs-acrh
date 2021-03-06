import { CrudController } from 'src/common/controllers';
import {
	ConvertRateDto,
	ConvertRateQueryDto,
	CreateConvertRateDto,
	UpdateConvertRateDto,
} from './dtos';
import { ConvertRate } from './models';
import { CreateConvertRatePipe } from './pipes';

export class ConvertRatesController extends CrudController('convert-rates', {
	model: ConvertRate,
	dto: ConvertRateDto,
	findAll: {
		dto: ConvertRateQueryDto,
	},
	create: {
		dto: CreateConvertRateDto,
		pipes: [CreateConvertRatePipe],
	},
	update: {
		dto: UpdateConvertRateDto,
	},
}) {}
