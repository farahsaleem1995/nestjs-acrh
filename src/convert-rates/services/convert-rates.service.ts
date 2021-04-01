import { CrudService } from 'src/common/services';
import { InjectRepository } from 'src/data/decorators';
import { Repository } from 'src/data/repositories';
import { ConvertRate } from '../models';

export class ConvertRatesService extends CrudService<ConvertRate> {
	constructor(@InjectRepository(ConvertRate) repository: Repository<ConvertRate>) {
		super(repository);
	}
}
