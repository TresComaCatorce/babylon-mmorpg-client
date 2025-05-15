import { Nullable } from '@babylonjs/core';

import GameController from './GameController';
import BaseScene from '../scenes/BaseScene';
import BaseController from './BaseController';

/**
 * @class ScenesController
 * @description Singleton controller responsible for managing scene transitions and the render loop in the game.
 * @extends BaseController
 */
class ScenesController extends BaseController {
	/**
	 * @static
	 * @description Singleton instance of ScenesController.
	 * @access private
	 */
	private static instance: ScenesController;

	/**
	 * @static
	 * @description Returns the singleton instance of ScenesController, creating it if necessary.
	 * @access public
	 * @returns {ScenesController} The singleton instance.
	 */
	public static getInstance(): ScenesController {
		if (!ScenesController.instance) {
			ScenesController.instance = new ScenesController();
		}
		return ScenesController.instance;
	}

	/**
	 * @description Private constructor to enforce singleton pattern.
	 * @access private
	 */
	private constructor() {
		super();
	}

	/**
	 * @description The currently active scene, or null if no scene is active.
	 * @access private
	 */
	private currentScene: Nullable<BaseScene> = null;

	/**
	 * @description Changes the current scene to a new scene, disposing of the previous one if it exists, and starts the render loop for the new scene.
	 * @access public
	 * @param {BaseScene} newScene - The new scene to switch to.
	 * @returns {void}
	 */
	public switchToScene(newScene: BaseScene): void {
		if (this.currentScene) {
			this.currentScene.disposeScene();
		}
		this.currentScene = newScene;

		GameController.getInstance().engine.runRenderLoop(() => {
			if (this.currentScene && !this.currentScene.isDisposed) {
				this.currentScene.render();
			}
		});
	}

	/**
	 * @description Initialization method.
	 * @access protected
	 * @returns {void}
	 */
	protected _init(): void {}

	/**
	 * @description Disposes of the current scene and stops the render loop.
	 * @access public
	 * @returns {void}
	 */
	public dispose(): void {
		if (this.currentScene) {
			this.currentScene.disposeScene();
			this.currentScene = null;
		}
		GameController.getInstance().engine.stopRenderLoop();
	}
}

export default ScenesController;
