import { Vector3, ArcRotateCamera, HemisphericLight } from '@babylonjs/core';

import ScenesController from '../controllers/ScenesController';
import SCENE_NAMES from '../utils/constants/SCENE_NAMES';
import VirtualScene from './VirtualScene';
import LoginScene from './LoginScene';

/**
 * @class LoadingScene
 * @description Scene responsible for displaying the loading screen, including camera and lighting setup.
 * @extends VirtualScene
 */
class LoadingScene extends VirtualScene {
	/**
	 * @description Constructs a new LoadingScene, initializes the base scene, and creates the loading environment.
	 * @access public
	 */
	constructor() {
		super({ sceneName: SCENE_NAMES.LOADING });
	}

	/**
	 * @description Creates the loading scene by setting up the camera and lighting.
	 * @access protected
	 * @returns {void}
	 */
	protected _preload(): void {
		const camera = new ArcRotateCamera(
			'camera',
			Math.PI / 2,
			Math.PI / 3,
			10,
			Vector3.Zero(),
			this,
		);
		camera.attachControl(true);
		new HemisphericLight('light', new Vector3(0, 1, 0), this);
	}

	private _switchToLoginScene(): void {
		ScenesController.getInstance().switchToScene(new LoginScene());
	}
}

export default LoadingScene;
