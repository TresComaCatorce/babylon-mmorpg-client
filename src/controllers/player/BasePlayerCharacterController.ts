import { AbstractMesh, Nullable } from '@babylonjs/core';

import { IBasePlayerCharacterControllerConstructorParams } from '@mmorpg/interfaces/controllers/player/IBasePlayerCharacterController';
import ICharacterRelated from '@mmorpg/interfaces/common-interfaces/ICharacterRelated';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';
import BaseController from '@mmorpg/controllers/BaseController';

abstract class BasePlayerCharacterController extends BaseController implements ICharacterRelated {
	protected _characterInstance: PlayerCharacter;
	protected _characterMesh: Nullable<AbstractMesh>;

	constructor(params: IBasePlayerCharacterControllerConstructorParams) {
		super();
		this._characterInstance = params.characterInstance;
		this._characterMesh = params.characterInstance.rootNode ?? null;
	}

	get characterInstance(): PlayerCharacter {
		return this._characterInstance;
	}
}

export default BasePlayerCharacterController;
