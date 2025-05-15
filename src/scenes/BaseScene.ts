import { Scene } from '@babylonjs/core';

import GameController from '../controllers/GameController';

/**
 * @abstract
 * @class BaseScene
 * @description Abstract base class for all game scenes, providing lifecycle hooks and utility methods for scene management.
 */
abstract class BaseScene extends Scene {
	/**
	 * @description Constructs a new BaseScene and attaches it to the current game engine. Shows the Babylon.js inspector in development mode.
	 * @access public
	 */
	constructor() {
		super(GameController.getInstance().engine);
		this._showInspectorInDevelopmentMode();
	}

	/**
	 * @description Optional asynchronous preload hook for loading assets or performing setup before scene creation.
	 * @access public
	 * @returns {Promise<void>}
	 */
	public async preload(): Promise<void> {}

	/**
	 * @description Abstract method to create and initialize the scene. Must be implemented by subclasses.
	 * @access public
	 * @abstract
	 * @returns {void}
	 */
	public abstract create(): void;

	/**
	 * @description Disposes of the scene and cleans up resources.
	 * @access public
	 * @returns {void}
	 */
	public disposeScene(): void {
		this.dispose();
	}

	/**
	 * @description Shows the Babylon.js inspector if running in development mode.
	 * @access private
	 * @returns {void}
	 */
	private _showInspectorInDevelopmentMode(): void {
		if (process.env.NODE_ENV === 'development') {
			import('@babylonjs/inspector').then(() => {
				this.debugLayer.show();
			});
		}
	}
}

export default BaseScene;
