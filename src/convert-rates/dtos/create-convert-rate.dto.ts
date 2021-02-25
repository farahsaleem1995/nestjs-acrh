import { AutoMap } from '@automapper/classes';
import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateConvertRateDto {
	@AutoMap()
	@IsString()
	@IsMongoId()
	fromCurrency: string;

	@AutoMap()
	@IsString()
	@IsMongoId()
	toCurrency: string;

	@AutoMap()
	@IsNumber()
	convertRateValue: number;
}
