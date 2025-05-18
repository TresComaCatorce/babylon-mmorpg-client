import { AbstractMesh, Nullable } from '@babylonjs/core';

import { IPlayerCharacterConstructorParams } from '@mmorpg/interfaces/entities/characters/IPlayerCharacter';
import IMovementController from '@mmorpg/interfaces/controllers/movement/IMovementController';
import BasicMovementController from '@mmorpg/controllers/movement/BasicMovementController';
import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';
import BaseCharacter from '@mmorpg/entities/characters/BaseCharacter';
import ScenesController from '@mmorpg/controllers/ScenesController';
import FollowPlayerCamera from '@mmorpg/camera/FollowPlayerCamera';
import BaseScene from '@mmorpg/scenes/BaseScene';

class PlayerCharacter extends BaseCharacter {
	private _name: string;
	private _kbInputController: Nullable<KeyboardInputController> = null;
	private _movementController: Nullable<IMovementController> = null;

	constructor(params: IPlayerCharacterConstructorParams) {
		super({ modelPath: 'assets/models/warrior.glb' });
		this._name = params.name;
	}

	public update() {
		this._movementController?.update();
	}

	protected _onMeshLoaded() {
		this._createPlayerCamera();
		this._createKbInputController();
		this._createMovementController();
	}

	private _createPlayerCamera() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		currentScene?.setActiveCamera(
			new FollowPlayerCamera(<BaseScene>currentScene, <AbstractMesh>this.mesh),
		);
	}

	private _createKbInputController() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		if (currentScene) {
			this._kbInputController = new KeyboardInputController({ scene: currentScene });
		}
	}

	private _createMovementController() {
		if (this.mesh && this._kbInputController) {
			this._movementController = new BasicMovementController({
				mesh: this.mesh,
				kbInputController: this._kbInputController,
			});
		}
	}
}

export default PlayerCharacter;
