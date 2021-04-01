import { CrudService } from 'src/common/services';
import { InjectRepository } from 'src/data/decorators';
import { Repository } from 'src/data/repositories';
import { Currency } from '../models';

export class CurrenciesService extends CrudService<Currency> {
	constructor(@InjectRepository(Currency) repository: Repository<Currency>) {
		super(repository);
	}
}
