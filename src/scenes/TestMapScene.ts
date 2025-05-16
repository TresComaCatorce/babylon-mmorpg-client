import {
	Vector3,
	HemisphericLight,
	MeshBuilder,
	StandardMaterial,
	Texture,
	FreeCamera,
} from '@babylonjs/core';

import PlayerCharacter from '@mmorpg/entities/characters/PlayerCharacter';
import SCENE_NAMES from '@mmorpg/utils/constants/SCENE_NAMES';
import MapScene from '@mmorpg/scenes/MapScene';

class TestMapScene extends MapScene {
	constructor() {
		super({ sceneName: SCENE_NAMES.TEST_MAP });
	}

	public _preload(): void {}

	public create() {
		this._createTempCamera();
		this._createTestContent();
	}

	private _createTestContent() {
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

		new PlayerCharacter({
			name: 'KriZ',
		});
	}

	private _createTempCamera(): void {
		const tempCamera = new FreeCamera('tempCamera', new Vector3(0, 5, -10), this);
		tempCamera.setTarget(Vector3.Zero());
		this.setActiveCamera(tempCamera);
	}
}

export default TestMapScene;
