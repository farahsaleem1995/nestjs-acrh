import { AutoMap } from '@automapper/classes';
import { Expose, Type } from 'class-transformer';
import { CurrencyDto } from 'src/currencies/dtos';
import { BaseDto } from 'src/data/dtos';

export class ConvertRateDto extends BaseDto {
	@AutoMap(() => CurrencyDto)
	@Expose()
	@Type(() => CurrencyDto)
	fromCurrency: CurrencyDto;

	@AutoMap(() => CurrencyDto)
	@Expose()
	@Type(() => CurrencyDto)
	toCurrency: CurrencyDto;

	@AutoMap()
	@Expose()
	convertRateValue: number;
}
