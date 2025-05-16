import { AbstractMesh, Vector3 } from '@babylonjs/core';

import IBasicMovementControllerConstructorParams from '@mmorpg/interfaces/controllers/movement/IBasicMovementController';
import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';
import IMovementController from '@mmorpg/interfaces/controllers/movement/IMovementController';

export class BasicMovementController implements IMovementController {
	private _mesh: AbstractMesh;
	private _kbInputController: KeyboardInputController;
	private _speed = 0.1;

	constructor(params: IBasicMovementControllerConstructorParams) {
		this._mesh = params.mesh;
		this._kbInputController = params.kbInputController;
	}

	public update() {
		let direction = Vector3.Zero();

		if (this._kbInputController.isKeyPressed('w')) {
			direction = direction.add(Vector3.Forward());
		}
		if (this._kbInputController.isKeyPressed('s')) {
			direction = direction.add(Vector3.Backward());
		}
		if (this._kbInputController.isKeyPressed('a')) {
			direction = direction.add(Vector3.Left());
		}
		if (this._kbInputController.isKeyPressed('d')) {
			direction = direction.add(Vector3.Right());
		}

		if (!direction.equals(Vector3.Zero())) {
			this._mesh.moveWithCollisions(direction.normalize().scale(this._speed));
		}
	}
}

export default BasicMovementController;
