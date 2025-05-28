import BaseCharacterController from '@mmorpg/controllers/character/BaseCharacterController';
import { ICharacterAnimationsControllerConstructorParams } from '@mmorpg/interfaces/controllers/character/ICharacterAnimationsController';

abstract class CharacterAnimationsController extends BaseCharacterController {
	constructor(params: ICharacterAnimationsControllerConstructorParams) {
		super(params);
	}
}

export default CharacterAnimationsController;
