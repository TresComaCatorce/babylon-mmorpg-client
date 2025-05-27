import { IBaseCharacterConstructorParams } from '@mmorpg/interfaces/controllers/character/IBaseCharacterController';
import BaseCharacter from '@mmorpg/entities/characters/BaseCharacter';

abstract class BaseCharacterController {
	private _characterInstance: BaseCharacter;

	constructor(params: IBaseCharacterConstructorParams) {
		this._characterInstance = params.characterInstance;
	}

	get characterInstance(): BaseCharacter {
		return this._characterInstance;
	}
}

export default BaseCharacterController;
