import {
	ArcRotateCamera,
	Vector3,
	HemisphericLight,
	MeshBuilder,
} from '@babylonjs/core';

import GameController from '@mmorpg/controllers/GameController';
import SCENE_NAMES from '@mmorpg/utils/constants/SCENE_NAMES';
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

		// Create ground
		MeshBuilder.CreateGround('ground', { width: 600, height: 600 }, this);

		// Create character
		this.loadAssets('assets/models/warrior.glb').then(() => {
			console.log('Anims groups...');
			this.animationGroups.forEach((group) => {
				console.log(`Anim Group: ${group.name}`);
			});
		});
	}
}

export default TestMapScene;
