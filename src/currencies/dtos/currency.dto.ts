import { AutoMap } from '@automapper/classes';
import { Exclude, Expose } from 'class-transformer';
import { BaseDto } from 'src/data/dtos';

@Exclude()
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
