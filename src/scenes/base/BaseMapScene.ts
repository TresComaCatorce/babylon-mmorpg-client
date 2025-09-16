import { Nullable } from '@babylonjs/core';

import { IBaseMapSceneConstructorParams } from '@mmorpg/interfaces/scenes/base/IBaseMapScene';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';
import BaseScene from '@mmorpg/scenes/base/BaseScene';

/**
 * @class BaseMapScene
 * @description Abstract scene class for map-related logic, providing a utility method to load map assets into the scene.
 * @abstract
 * @extends BaseScene
 */
abstract class BaseMapScene extends BaseScene {
	protected _playerCharacter: Nullable<PlayerCharacter> = null;

	/**
	 * @description Constructs a new BaseMapScene and initializes the base scene.
	 * @access public
	 */
	constructor(params: IBaseMapSceneConstructorParams) {
		super(params);
	}

	get playerCharacter(): Nullable<PlayerCharacter> {
		return this._playerCharacter;
	}
}

export default BaseMapScene;
