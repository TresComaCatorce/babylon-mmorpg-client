import { AbstractMesh } from '@babylonjs/core';

import { IPlayerCharacterConstructorParams } from '@mmorpg/interfaces/entities/characters/IPlayerCharacter';
// import IMovementController from '@mmorpg/interfaces/controllers/movement/IMovementController';
import BaseCharacter from '@mmorpg/entities/characters/BaseCharacter';
import FollowPlayerCamera from '@mmorpg/camera/FollowPlayerCamera';
import ScenesController from '@mmorpg/controllers/ScenesController';
import BaseScene from '@mmorpg/scenes/BaseScene';
// import BasicMovementController from '@mmorpg/controllers/movement/BasicMovementController';
// import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';

class PlayerCharacter extends BaseCharacter {
	private _name: string;
	// private _camera: FollowPlayerCamera;
	// private _kbInputController: KeyboardInputController;
	// private _movementController: IMovementController;

	constructor(params: IPlayerCharacterConstructorParams) {
		super({ modelPath: 'assets/models/warrior.glb' });
		this._name = params.name;
		// this._camera = this._createPlayerCamera();
		// this._kbInputController = this._createKbInputController();
		// this._movementController = this._createMovementController();
	}

	protected _onMeshLoaded() {
		this._createPlayerCamera();
	}

	private _createPlayerCamera() {
		const currentScene =
			ScenesController.getInstance().currentSceneInstance;
		currentScene?.setActiveCamera(
			new FollowPlayerCamera(
				<BaseScene>currentScene,
				<AbstractMesh>this.mesh,
			),
		);
	}

	// private _createKbInputController() {
	// 	const currentScene =
	// 		ScenesController.getInstance().currentSceneInstance;
	// 	return new KeyboardInputController({ scene: <BaseScene>currentScene });
	// }

	// private _createMovementController() {
	// 	return new BasicMovementController({
	// 		mesh: <AbstractMesh>this.mesh,
	// 		kbInputController: this._kbInputController,
	// 	});
	// }
}

export default PlayerCharacter;
