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

export class BasicMovementController implements IMovementController {
	private _mesh: AbstractMesh;
	private _visualMesh: AbstractMesh;
	private _kbInputController: KeyboardInputController;
	private _camera: Camera;
	private _speed = 0.1;

	constructor(params: IBasicMovementControllerConstructorParams) {
		this._mesh = params.mesh;
		this._visualMesh = params.visualMesh;
		this._kbInputController = params.kbInputController;
		this._camera = params.camera;
	}

	public update() {
		const forward = this._kbInputController.isKeyPressed('w');
		const backward = this._kbInputController.isKeyPressed('s');
		const left = this._kbInputController.isKeyPressed('a');
		const right = this._kbInputController.isKeyPressed('d');

		if (forward || backward || left || right) {
			// Forward direction of the camera, projected to the XZ plane
			const cameraForward = this._camera.getForwardRay().direction;
			const forwardXZ = new Vector3(cameraForward.x, 0, cameraForward.z).normalize();

			// Base rotated on the Y axis
			const cameraRight = Vector3.Cross(forwardXZ, Vector3.Up()).normalize();

			let moveDirection = Vector3.Zero();

			if (forward) moveDirection = moveDirection.add(forwardXZ);
			if (backward) moveDirection = moveDirection.subtract(forwardXZ);
			if (left) moveDirection = moveDirection.add(cameraRight);
			if (right) moveDirection = moveDirection.subtract(cameraRight);

			moveDirection.normalize();

			// Rotate the visualMesh in the direction of movement
			if (!moveDirection.equals(Vector3.Zero())) {
				const angleY = Math.atan2(moveDirection.x, moveDirection.z) + Math.PI;
				this._visualMesh.rotationQuaternion = Quaternion.FromEulerAngles(0, angleY, 0);

				this._mesh.moveWithCollisions(moveDirection.scale(this._speed));
			}
		}
	}
}

export default BasicMovementController;
