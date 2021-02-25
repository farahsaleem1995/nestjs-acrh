import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { DataQuery } from 'src/data/types';

export function QueryTransform(queryType: ClassConstructor<any>) {
	return class QueryTransformPipe implements PipeTransform {
		async transform(value: any, metadata: ArgumentMetadata): Promise<DataQuery<any>> {
			await this.validate(value, queryType);

			return value;
		}

		async validate(value: any, cls: ClassConstructor<any>): Promise<any> {
			const classObj = plainToClass(cls, value, { enableImplicitConversion: true });

			const errors = await validate(classObj, {
				whitelist: true,
				validationError: true,
			});

			if (errors.length) {
				throw new BadRequestException(errors.map((err) => err.constraints));
			}

			return classObj;
		}
	};
}
