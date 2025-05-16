import { IBaseSceneConstructorParams } from '@mmorpg/interfaces/scenes/IBaseScene';
import BaseScene from '@mmorpg/scenes/BaseScene';

/**
 * @class MapScene
 * @description Abstract scene class for map-related logic, providing a utility method to load map assets into the scene.
 * @abstract
 * @extends BaseScene
 */
abstract class MapScene extends BaseScene {
	/**
	 * @description Constructs a new MapScene and initializes the base scene.
	 * @access public
	 */
	constructor(params: IBaseSceneConstructorParams) {
		super(params);
	}
}

export default MapScene;
