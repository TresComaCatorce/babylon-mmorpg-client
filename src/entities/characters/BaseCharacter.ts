import { IEntityConstructorParams } from '@mmorpg/interfaces/entities/IEntity';
import Entity from '@mmorpg/entities/Entity';

abstract class BaseCharacter extends Entity {
	constructor(params: IEntityConstructorParams) {
		super(params);
	}
}

export default BaseCharacter;
