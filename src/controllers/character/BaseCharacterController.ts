import { AbstractMesh, Nullable } from '@babylonjs/core';

import { IBaseCharacterConstructorParams } from '@mmorpg/interfaces/controllers/character/IBaseCharacterController';
import BaseCharacter from '@mmorpg/entities/characters/BaseCharacter';

abstract class BaseCharacterController {
	protected _characterInstance: BaseCharacter;
	protected _characterMesh: Nullable<AbstractMesh>;

	constructor(params: IBaseCharacterConstructorParams) {
		this._characterInstance = params.characterInstance;
		this._characterMesh = params.characterInstance.rootNode ?? null;
	}
}

export default BaseCharacterController;
