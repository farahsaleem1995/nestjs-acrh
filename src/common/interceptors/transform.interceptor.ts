import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export function TransformInterceptor(destination: ClassConstructor<any>): NestInterceptor {
	@Injectable()
	class TransformResponseInterceptor implements NestInterceptor {
		constructor(private readonly destination: ClassConstructor<any>) {}

		intercept(
			context: ExecutionContext,
			next: CallHandler,
		): Observable<any> | Promise<Observable<any>> {
			return next.handle().pipe(map((data) => plainToClass(this.destination, data)));
		}
	}

	return new TransformResponseInterceptor(destination);
}
