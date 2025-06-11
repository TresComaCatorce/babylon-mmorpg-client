import { Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture, FreeCamera, Nullable } from '@babylonjs/core';

import { createControlsInfoHelper } from '@mmorpg/ui/helpers/controls-info-helper';
import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';
import SCENE_NAMES from '@mmorpg/utils/constants/SCENE_NAMES';
import MapScene from '@mmorpg/scenes/MapScene';

class TestMapScene extends MapScene {
	private _playerCharacter: Nullable<PlayerCharacter> = null;

	constructor() {
		super({ sceneName: SCENE_NAMES.TEST_MAP });
	}

	public preload(): void {
		console.log(`TestMapScene.ts | "preload" method execution`);
		this._createTempCamera();
	}

	public loaded() {
		console.log(`TestMapScene.ts | "loaded" method execution`);
		this._createTestMapSceneContent();
		createControlsInfoHelper(this);
	}
	public update() {
		// console.log(`TestMapScene.ts | "update" method execution`);
		this._playerCharacter?.update();
	}

	private _createTestMapSceneContent() {
		// Add light
		new HemisphericLight('light', new Vector3(0, 1, 0), this);

		// Create ground
		const ground = MeshBuilder.CreateGround('ground', { width: 600, height: 600 }, this);
		// Crear el material
		const groundMaterial = new StandardMaterial('groundMat', this);

		// Cargar la textura
		groundMaterial.diffuseTexture = new Texture('assets/textures/grass.png', this);

		// (Opcional) Repetir la textura si se ve estirada
		(groundMaterial.diffuseTexture as Texture).uScale = 150;
		(groundMaterial.diffuseTexture as Texture).vScale = 150;

		// Asignar el material al mesh
		ground.material = groundMaterial;

		this._playerCharacter = new PlayerCharacter({
			characterName: 'KriZ',
		});
	}

	private _createTempCamera(): void {
		const tempCamera = new FreeCamera('tempCamera', new Vector3(0, 5, -10), this);
		tempCamera.setTarget(Vector3.Zero());
		this.setActiveCamera(tempCamera);
	}
}

export default TestMapScene;
