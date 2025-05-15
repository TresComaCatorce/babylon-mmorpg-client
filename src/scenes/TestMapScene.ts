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
import ScenesController from '@mmorpg/controllers/ScenesController';
import LoadingScene from './LoadingScene';
import MapScene from './MapScene';

class TestMapScene extends MapScene {
	constructor() {
		super({ sceneName: SCENE_NAMES.TEST_MAP });
		this._createTestContent();
	}

	public _preload(): void {}

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

		// Create sphere
		const sphere = MeshBuilder.CreateSphere(
			'sphere',
			{ diameter: 2 },
			this,
		);
		sphere.position.y = 1;

		// Create ground
		MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, this);

		this.onPointerObservable.add((pointerInfo: PointerInfo) => {
			switch (pointerInfo.type) {
				case PointerEventTypes.POINTERDOWN:
					if (pointerInfo?.pickInfo?.hit) {
						if (pointerInfo.pickInfo.pickedMesh === sphere) {
							ScenesController.getInstance().switchToScene(
								new LoadingScene(),
							);
						}
					}
					break;
			}
		});
	}
}

export default TestMapScene;
