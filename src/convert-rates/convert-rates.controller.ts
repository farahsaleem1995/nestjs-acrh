import { Inject } from '@nestjs/common';
import { CrudController } from 'src/common/controllers';
import {
	ConvertRateDto,
	ConvertRateQueryDto,
	CreateConvertRateDto,
	UpdateConvertRateDto,
} from './dtos';
import { ConvertRate } from './models';
import { CreateConvertRatePipe } from './pipes';
import { ConvertRatesService } from './services';

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
}) {
	constructor(
		@Inject(ConvertRatesService) private readonly convertRatesService: ConvertRatesService,
	) {
		super(convertRatesService);
	}
}
