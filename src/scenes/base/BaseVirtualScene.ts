import { IBaseVirtualSceneConstructorParams } from '@mmorpg/interfaces/scenes/base/IBaseVirtualScene';
import BaseScene from '@mmorpg/scenes/base/BaseScene';

/**
 * @class BaseVirtualScene
 * @description Abstract scene class for virtual environments, extending BaseScene for further specialization.
 * @abstract
 * @extends BaseScene
 */
abstract class BaseVirtualScene extends BaseScene {
	/**
	 * @description Constructs a new BaseVirtualScene and initializes the base scene.
	 * @access public
	 */
	constructor(params: IBaseVirtualSceneConstructorParams) {
		super(params);
	}
}

export default BaseVirtualScene;
