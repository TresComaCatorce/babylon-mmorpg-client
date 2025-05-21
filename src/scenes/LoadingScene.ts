import { Vector3, ArcRotateCamera, HemisphericLight } from '@babylonjs/core';

import ScenesController from '@mmorpg/controllers/ScenesController';
import SCENE_NAMES from '@mmorpg/utils/constants/SCENE_NAMES';
import VirtualScene from '@mmorpg/scenes/VirtualScene';
import LoginScene from '@mmorpg/scenes/LoginScene';

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
		this._switchToLoginScene();
	}

	public preload(): void {
		console.log(`LoadingScene.ts | "preload" method execution`);
		const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 3, 10, Vector3.Zero(), this);
		camera.attachControl(true);
		new HemisphericLight('light', new Vector3(0, 1, 0), this);
	}

	public loaded() {
		console.log(`LoadingScene.ts | "loaded" method execution`);
	}

	public update() {
		// console.log(`LoadingScene.ts | "update" method execution`);
	}

	private _switchToLoginScene(): void {
		setTimeout(() => {
			ScenesController.getInstance().switchToScene(new LoginScene());
		}, 5000);
	}
}

export default LoadingScene;
