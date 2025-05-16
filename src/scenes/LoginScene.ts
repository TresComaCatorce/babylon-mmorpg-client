import {
	PointerEventTypes,
	ArcRotateCamera,
	Vector3,
	HemisphericLight,
	MeshBuilder,
	PointerInfo,
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
	protected _preload(): void {}

	public create() {}

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

		// Create ground
		const ground = MeshBuilder.CreateGround(
			'ground',
			{ width: 6, height: 6 },
			this,
		);

		this.onPointerObservable.add((pointerInfo: PointerInfo) => {
			switch (pointerInfo.type) {
				case PointerEventTypes.POINTERDOWN:
					if (pointerInfo?.pickInfo?.hit) {
						if (pointerInfo.pickInfo.pickedMesh === ground) {
							ScenesController.getInstance().switchToScene(
								new TestMapScene(),
							);
						}
					}
					break;
			}
		});
	}
}

export default LoginScene;
