import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ClassConstructor } from 'class-transformer';

@Injectable()
export class WhitelistValidationPipe<Dto extends ClassConstructor<Dto>>
	implements PipeTransform<Dto, Promise<Dto>> {
	constructor(protected cls: ClassConstructor<Dto>) {}

	async transform(value: Dto, metadata: ArgumentMetadata): Promise<Dto> {
		value = plainToClass(this.cls, value);

		const validationError = await validate(value, {
			whitelist: true,
		});

		if (validationError.length > 0) {
			throw new BadRequestException();
		}

		return value;
	}
}
