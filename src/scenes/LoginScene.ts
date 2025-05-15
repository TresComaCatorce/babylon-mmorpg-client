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
		super();
		this.create();
	}

	/**
	 * @description Creates the login scene. Intended to be extended with login UI and logic.
	 * @access public
	 * @returns {void}
	 */
	public create(): void {}
}

export default LoginScene;
