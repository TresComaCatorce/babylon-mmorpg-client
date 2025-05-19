/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	AbstractMesh,
	Camera,
	FollowCamera,
	Matrix,
	Quaternion,
	Scene,
	Vector3,
} from '@babylonjs/core';

import IBasicMovementControllerConstructorParams from '@mmorpg/interfaces/controllers/movement/IBasicMovementController';
import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';
import IMovementController from '@mmorpg/interfaces/controllers/movement/IMovementController';
import drawVector3 from '@mmorpg/utils/debug/drawVector3';
import ScenesController from '../ScenesController';
import BaseScene from '@mmorpg/scenes/BaseScene';

export class BasicMovementController implements IMovementController {
	private _mesh: AbstractMesh;
	private _kbInputController: KeyboardInputController;
	private _camera: Camera;
	private _speed = 0.1;

	constructor(params: IBasicMovementControllerConstructorParams) {
		this._mesh = params.mesh;
		this._kbInputController = params.kbInputController;
		this._camera = params.camera;
	}

	public update() {
		let direction = Vector3.Zero();

		const currentScene = ScenesController.getInstance().currentSceneInstance;

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

		drawVector3(<BaseScene>currentScene, direction);

		if (!direction.equals(Vector3.Zero())) {
			// 	// Change the character direction with the camera direction
			const yRotation = (<FollowCamera>this._camera).rotation.y;
			direction = Vector3.TransformCoordinates(direction, Matrix.RotationY(yRotation));
			this._mesh.moveWithCollisions(direction.normalize().scale(this._speed));
		}
	}
}

export default BasicMovementController;
