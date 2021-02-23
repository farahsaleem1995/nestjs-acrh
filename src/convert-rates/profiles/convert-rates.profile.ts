import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { BaseDto } from 'src/common/dtos';
import { BaseModel } from 'src/data/models';
import { ConvertRateDto } from '../dtos/convert-rate.dto';
import { ConvertRate } from '../models';

@Injectable()
export class ConvertRateProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	mapProfile() {
		return (mapper: Mapper) => {
			mapper.createMap(ConvertRate, ConvertRateDto);
		};
	}
}
