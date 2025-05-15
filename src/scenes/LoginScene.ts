import SCENE_NAMES from '../utils/constants/SCENE_NAMES';
import VirtualScene from './VirtualScene';

/**
 * @class LoginScene
 * @description Scene responsible for displaying and managing the login interface.
 * @extends VirtualScene
 */
class LoginScene extends VirtualScene {
	/**
	 * @description Constructs a new LoginScene, initializes the base scene, and creates the login environment.
	 * @access public
	 */
	constructor() {
		super({ sceneName: SCENE_NAMES.LOGIN });
	}

	/**
	 * @description Creates the login scene. Intended to be extended with login UI and logic.
	 * @access protected
	 * @returns {void}
	 */
	public _preload(): void {}
}

export default LoginScene;
