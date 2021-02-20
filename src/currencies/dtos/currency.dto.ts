import { AutoMap } from '@automapper/classes';
import { Expose } from 'class-transformer';
import { BaseDto } from 'src/data/dtos';

export class CurrencyDto extends BaseDto {
	@AutoMap()
	@Expose()
	name: string;

	@AutoMap()
	@Expose()
	code: string;

	@AutoMap()
	@Expose()
	symbol: string;
}
