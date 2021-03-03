import { AutoMap } from '@automapper/classes';
import { Exclude, Expose, Type } from 'class-transformer';
import { CurrencyDto } from 'src/currencies/dtos';
import { BaseDto } from 'src/common/dtos';

@Exclude()
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
