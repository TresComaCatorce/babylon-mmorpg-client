import { Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture, FreeCamera, Nullable } from '@babylonjs/core';

import PlayerCharacter from '@mmorpg/game-objects/characters/PlayerCharacter';
import SCENE_NAMES from '@mmorpg/utils/constants/SCENE_NAMES';
import MapScene from '@mmorpg/scenes/base/BaseMapScene';

class GrassMapScene extends MapScene {
	private _playerCharacter: Nullable<PlayerCharacter> = null;

	constructor() {
		super({ sceneName: SCENE_NAMES.TEST_MAP });
	}

	public preload(): void {
		console.log(`GrassMapScene.ts | "preload" method execution`);
		this._createTempCamera();
	}

	public loaded() {
		console.log(`GrassMapScene.ts | "loaded" method execution`);
		this._createGrassMapSceneContent();
	}
	public update() {
		// console.log(`GrassMapScene.ts | "update" method execution`);
		this._playerCharacter?.update();
	}

	private _createGrassMapSceneContent() {
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
			currentHP: 750000,
			maxHP: 999999,
			currentMP: 850000,
			maxMP: 999999,
		});
	}

	private _createTempCamera(): void {
		const tempCamera = new FreeCamera('tempCamera', new Vector3(0, 5, -10), this);
		tempCamera.setTarget(Vector3.Zero());
		this.setActiveCamera(tempCamera);
	}
}

export default GrassMapScene;
