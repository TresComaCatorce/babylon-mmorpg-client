import { IBaseSceneConstructorParams } from '@mmorpg/interfaces/scenes/IBaseScene';
import BaseScene from '@mmorpg/scenes/BaseScene';

/**
 * @class VirtualScene
 * @description Abstract scene class for virtual environments, extending BaseScene for further specialization.
 * @abstract
 * @extends BaseScene
 */
abstract class VirtualScene extends BaseScene {
	/**
	 * @description Constructs a new VirtualScene and initializes the base scene.
	 * @access public
	 */
	constructor(params: IBaseSceneConstructorParams) {
		super(params);
	}
}

export default VirtualScene;
