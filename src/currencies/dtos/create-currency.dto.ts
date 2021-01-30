import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCurrencyDto {
	@AutoMap()
	@IsNotEmpty()
	@IsString()
	name: string;

	@AutoMap()
	@IsNotEmpty()
	@IsString()
	code: string;

	@AutoMap()
	@IsNotEmpty()
	@IsString()
	symbol: string;
}
