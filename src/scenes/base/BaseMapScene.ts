import { IBaseMapSceneConstructorParams } from '@mmorpg/interfaces/scenes/base/IBaseMapScene';
import BaseScene from '@mmorpg/scenes/base/BaseScene';

/**
 * @class BaseMapScene
 * @description Abstract scene class for map-related logic, providing a utility method to load map assets into the scene.
 * @abstract
 * @extends BaseScene
 */
abstract class BaseMapScene extends BaseScene {
	/**
	 * @description Constructs a new BaseMapScene and initializes the base scene.
	 * @access public
	 */
	constructor(params: IBaseMapSceneConstructorParams) {
		super(params);
	}
}

export default BaseMapScene;
