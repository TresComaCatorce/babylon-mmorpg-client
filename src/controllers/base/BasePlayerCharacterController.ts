import { AbstractMesh, Nullable } from '@babylonjs/core';

import { IBasePlayerCharacterControllerConstructorParams } from '@mmorpg/interfaces/controllers/base/IBasePlayerCharacterController';
import BaseCharacterController from '@mmorpg/controllers/base/BaseCharacterController';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';

abstract class BasePlayerCharacterController extends BaseCharacterController {
	protected _characterInstance: PlayerCharacter;
	protected _characterMesh: Nullable<AbstractMesh>;

	constructor(params: IBasePlayerCharacterControllerConstructorParams) {
		super(params);
		this._characterInstance = params.characterInstance;
		this._characterMesh = params.characterInstance.rootNode ?? null;
	}

	get characterInstance(): PlayerCharacter {
		return this._characterInstance;
	}
}

export default BasePlayerCharacterController;
