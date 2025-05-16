import { Scene, Camera } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

import { IBaseSceneConstructorParams } from '@mmorpg/interfaces/scenes/IBaseScene';
import GameController from '@mmorpg/controllers/GameController';

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
	constructor(params: IBaseSceneConstructorParams) {
		super(GameController.getInstance().engine);
		this.metadata = { sceneName: params.sceneName };
		this._preload();
		this._showInspectorInDevelopmentMode();
	}

	public abstract create(): void;

	/**
	 * @description Disposes of the scene and cleans up resources.
	 * @access public
	 * @returns {void}
	 */
	public disposeScene(): void {
		this.debugLayer.hide();
		this.dispose();
	}

	public setActiveCamera(newCamera: Camera): void {
		if (newCamera) {
			if (this.activeCamera) {
				this.activeCamera.dispose();
				this.removeCamera(this.activeCamera);
			}
			this.activeCamera = newCamera;
			this.activeCamera?.attachControl(true);
		}
	}

	/**
	 * @description
	 * @access protected
	 * @returns {void}
	 * @abstract
	 */
	protected abstract _preload(): void;

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
