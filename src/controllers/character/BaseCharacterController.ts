import { AbstractMesh, Nullable } from '@babylonjs/core';

import { IBaseCharacterControllerConstructorParams } from '@mmorpg/interfaces/controllers/character/IBaseCharacterController';
import ICharacterRelated from '@mmorpg/interfaces/common-interfaces/ICharacterRelated';
import BaseCharacter from '@mmorpg/game-objects/characters/BaseCharacter';
import BaseController from '@mmorpg/controllers/BaseController';

abstract class BaseCharacterController extends BaseController implements ICharacterRelated {
	protected _characterInstance: BaseCharacter;
	protected _characterMesh: Nullable<AbstractMesh>;

	constructor(params: IBaseCharacterControllerConstructorParams) {
		super();
		this._characterInstance = params.characterInstance;
		this._characterMesh = params.characterInstance.rootNode ?? null;
	}

	get characterInstance(): BaseCharacter {
		return this._characterInstance;
	}
}

export default BaseCharacterController;
