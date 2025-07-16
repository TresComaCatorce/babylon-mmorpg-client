import { Vector3, ArcRotateCamera, HemisphericLight, DynamicTexture, MeshBuilder, StandardMaterial, Color3 } from '@babylonjs/core';

import ScenesController from '@mmorpg/controllers/ScenesController';
import BaseVirtualScene from '@mmorpg/scenes/base/BaseVirtualScene';
import GameController from '@mmorpg/controllers/GameController';
import SCENE_NAMES from '@mmorpg/utils/constants/SCENE_NAMES';
import LoginScene from '@mmorpg/scenes/virtuals/LoginScene';

/**
 * @class LoadingScene
 * @description Scene responsible for displaying the loading screen, including camera and lighting setup.
 * @extends BaseVirtualScene
 */
class LoadingScene extends BaseVirtualScene {
	/**
	 * @description Constructs a new LoadingScene, initializes the base scene, and creates the loading environment.
	 * @access public
	 */
	constructor() {
		super({ sceneName: SCENE_NAMES.LOADING });
	}

	public preload(): void {
		console.log(`LoadingScene.ts | "preload" method execution`);
		const canvasElement = GameController.getInstance().canvasElement;

		const camera = new ArcRotateCamera('camera', 0, 0, 10, Vector3.Zero(), this);
		camera.setPosition(new Vector3(0, 10, 0));
		camera.target = Vector3.Zero();
		camera.lowerBetaLimit = 0;
		camera.upperBetaLimit = 0;
		camera.attachControl(canvasElement, true);

		new HemisphericLight('light', new Vector3(0, 1, 0), this);

		const ground = MeshBuilder.CreateGround('ground', { width: 6, height: 3 }, this);

		ground.rotation.y = Math.PI;

		const textureWidth = 1000;
		const textureHeight = 200;
		const texture = new DynamicTexture('dynamic texture', { width: textureWidth, height: textureHeight }, this, false);
		texture.hasAlpha = false;

		const ctx = texture.getContext();
		ctx.fillStyle = '#696969';
		ctx.fillRect(0, 0, textureWidth, textureHeight);

		texture.drawText('Loading resources...', null, textureHeight / 2, 'bold 90px Arial', 'black', '#f8f8ff', true);

		const mat = new StandardMaterial('textMat', this);
		mat.diffuseTexture = texture;
		mat.backFaceCulling = false;
		mat.specularColor = new Color3(0, 0, 0);
		ground.material = mat;
	}

	public loaded() {
		console.log(`LoadingScene.ts | "loaded" method execution`);
		this._switchToLoginScene();
	}

	public update() {
		// console.log(`LoadingScene.ts | "update" method execution`);
	}

	private _switchToLoginScene(): void {
		ScenesController.getInstance().switchToScene(new LoginScene());
	}
}

export default LoadingScene;
