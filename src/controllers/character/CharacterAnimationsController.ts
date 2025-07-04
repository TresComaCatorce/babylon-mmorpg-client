import { ICharacterAnimationsControllerConstructorParams } from '@mmorpg/interfaces/controllers/character/ICharacterAnimationsController';
import BaseCharacterController from '@mmorpg/controllers/base/BaseCharacterController';

abstract class CharacterAnimationsController extends BaseCharacterController {
	constructor(params: ICharacterAnimationsControllerConstructorParams) {
		super(params);
	}
}

export default CharacterAnimationsController;
