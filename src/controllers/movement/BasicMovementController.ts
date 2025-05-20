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
			const yRotation = (<FollowCamera>this._camera).rotation.y;
			const rotatedDirection = Vector3.TransformCoordinates(
				direction,
				Matrix.RotationY(yRotation),
			).normalize();

			this._mesh.moveWithCollisions(rotatedDirection.scale(this._speed));
		}
	}

	private _rotateMeshToCameraDirection() {
		const cameraForward = this._camera.getForwardRay().direction;

		// const cameraDirectionXZ = new Vector3(cameraForward.x, 0, cameraForward.z).normalize();
		// drawVector3(cameraForward);

		// if () {

		// }
		// if (cameraDirectionXZ.lengthSquared() > 0.001) {
		// 	const angleY = Math.atan2(cameraDirectionXZ.x, cameraDirectionXZ.z);
		// 	const targetRotation = Quaternion.FromEulerAngles(0, angleY, 0);
		// 	this._mesh.rotationQuaternion = targetRotation;
		// }
	}
}

export default BasicMovementController;
