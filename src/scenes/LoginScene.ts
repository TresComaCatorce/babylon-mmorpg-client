import {
	ArcRotateCamera,
	Vector3,
	HemisphericLight,
	MeshBuilder,
} from '@babylonjs/core';

import SCENE_NAMES from '../utils/constants/SCENE_NAMES';
import VirtualScene from './VirtualScene';
import GameController from '../controllers/GameController';

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
		this._createTestContent();
	}

	/**
	 * @description Creates the login scene. Intended to be extended with login UI and logic.
	 * @access protected
	 * @returns {void}
	 */
	public _preload(): void {}

	private _createTestContent() {
		const canvasElement = GameController.getInstance().canvasElement;
		const camera = new ArcRotateCamera(
			'camera',
			Math.PI / 2,
			Math.PI / 3,
			10,
			Vector3.Zero(),
			this,
		);
		camera.attachControl(canvasElement, true);

		// Add light
		new HemisphericLight('light', new Vector3(0, 1, 0), this);

		// Create sphere
		const sphere = MeshBuilder.CreateSphere(
			'sphere',
			{ diameter: 2 },
			this,
		);
		sphere.position.y = 1;

		// Create ground
		MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, this);
	}
}

export default LoginScene;
