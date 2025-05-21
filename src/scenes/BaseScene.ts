import { Scene, Camera, GlowLayer } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

import { IBaseSceneConstructorParams } from '@mmorpg/interfaces/scenes/IBaseScene';
import GameController from '@mmorpg/controllers/GameController';

/**
 * @abstract
 * @class BaseScene
 * @description Abstract base class for all game scenes, providing lifecycle hooks and utility methods for scene management.
 */
abstract class BaseScene extends Scene {
	private _glowLayer!: GlowLayer;

	/**
	 * @description Constructs a new BaseScene and attaches it to the current game engine. Shows the Babylon.js inspector in development mode.
	 * @access public
	 */
	constructor(params: IBaseSceneConstructorParams) {
		super(GameController.getInstance().engine);
		this.metadata = { sceneName: params.sceneName };
		this.preload();
		this._showInspectorInDevelopmentMode();
		this._createGlowLayer();
	}

	public abstract preload(): void; // Executed first when the scene is being created
	public abstract loaded(): void; // Executed when the scene is loaded and runing
	public abstract update(): void; // Executed on each frame

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

	private _createGlowLayer() {
		this._glowLayer = new GlowLayer('glow', this);
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

	get sceneName(): string {
		return this.metadata.sceneName;
	}
}

export default BaseScene;
