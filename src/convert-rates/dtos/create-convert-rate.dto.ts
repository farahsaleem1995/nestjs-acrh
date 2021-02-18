import { AutoMap } from '@automapper/classes';
import { Expose } from 'class-transformer';
import { IsMongoId, IsNumber, IsString } from 'class-validator';
import { BaseDto } from 'src/data/dtos';

export class CreateConvertRateDto {
	@AutoMap()
	@IsString()
	@IsMongoId()
	@Expose()
	fromCurrency: string;

	@AutoMap()
	@IsString()
	@IsMongoId()
	@Expose()
	toCurrency: string;

	@AutoMap()
	@IsNumber()
	@Expose()
	convertRateValue: number;
}
