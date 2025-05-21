import {
	PointerEventTypes,
	ArcRotateCamera,
	Vector3,
	HemisphericLight,
	MeshBuilder,
	PointerInfo,
	DynamicTexture,
	StandardMaterial,
	Color3,
} from '@babylonjs/core';

import GameController from '@mmorpg/controllers/GameController';
import SCENE_NAMES from '@mmorpg/utils/constants/SCENE_NAMES';
import VirtualScene from '@mmorpg/scenes/VirtualScene';
import ScenesController from '@mmorpg/controllers/ScenesController';
import TestMapScene from '@mmorpg/scenes/TestMapScene';

/**
 * @class LoginScene
 * @description Scene responsible for displaying and managing the login interface.
 * @extends VirtualScene
 */
class LoginScene extends VirtualScene {
	constructor() {
		super({ sceneName: SCENE_NAMES.LOGIN });
	}

	public preload(): void {
		console.log(`LoginScene.ts | "preload" method execution`);
		this._createLoginSceneContent();
	}

	public loaded() {
		console.log(`LoginScene.ts | "loaded" method execution`);
	}

	public update() {}

	private _createLoginSceneContent() {
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

		const textureWidth = 1024;
		const textureHeight = 512;
		const texture = new DynamicTexture('dynamic texture', { width: textureWidth, height: textureHeight }, this, false);
		texture.hasAlpha = false;

		const ctx = texture.getContext();
		ctx.fillStyle = '#696969';
		ctx.fillRect(0, 0, textureWidth, textureHeight);

		texture.drawText('Click here to start', null, textureHeight / 2, 'bold 110px Arial', 'black', '#f8f8ff', true);

		const mat = new StandardMaterial('textMat', this);
		mat.diffuseTexture = texture;
		mat.backFaceCulling = false;
		mat.specularColor = new Color3(0, 0, 0);
		ground.material = mat;

		this.onPointerObservable.add((pointerInfo: PointerInfo) => {
			if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
				if (pointerInfo?.pickInfo?.hit && pointerInfo.pickInfo.pickedMesh === ground) {
					ScenesController.getInstance().switchToScene(new TestMapScene());
				}
			}
		});
	}
}

export default LoginScene;
