import BaseScene from './BaseScene';

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
	constructor() {
		super();
	}
}

export default VirtualScene;
