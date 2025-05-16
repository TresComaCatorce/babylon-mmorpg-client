import { Nullable } from '@babylonjs/core';

import GameController from '@mmorpg/controllers/GameController';
import BaseController from '@mmorpg/controllers/BaseController';
import BaseScene from '@mmorpg/scenes/BaseScene';

/**
 * @class ScenesController
 * @description Singleton controller responsible for managing scene transitions and the render loop in the game.
 * @extends BaseController
 */
class ScenesController extends BaseController {
	private static _instance: ScenesController;
	private _currentScene: Nullable<BaseScene> = null;

	/**
	 * @static
	 * @description Returns the singleton instance of ScenesController, creating it if necessary.
	 * @access public
	 * @returns {ScenesController} The singleton instance.
	 */
	public static getInstance(): ScenesController {
		if (!ScenesController._instance) {
			ScenesController._instance = new ScenesController();
		}
		return ScenesController._instance;
	}

	/**
	 * @description Private constructor to enforce singleton pattern.
	 * @access private
	 */
	private constructor() {
		super();
	}

	/**
	 * @description Disposes of the current scene and stops the render loop.
	 * @access public
	 * @returns {void}
	 */
	public dispose(): void {
		if (this._currentScene) {
			this._currentScene.disposeScene();
			this._currentScene = null;
		}
		GameController.getInstance().engine.stopRenderLoop();
	}

	/**
	 * @description Changes the current scene to a new scene, disposing of the previous one if it exists, and starts the render loop for the new scene.
	 * @access public
	 * @param {BaseScene} newScene - The new scene to switch to.
	 * @returns {void}
	 */
	public switchToScene(newScene: BaseScene): void {
		if (this._currentScene) {
			this._currentScene.disposeScene();
		}
		this._currentScene = newScene;
		this._currentScene.create();
	}

	/**
	 * @description Initialization method.
	 * @access protected
	 * @returns {void}
	 */
	protected _init(): void {}

	get currentSceneInstance(): Nullable<BaseScene> {
		return this._currentScene;
	}
}

export default ScenesController;
