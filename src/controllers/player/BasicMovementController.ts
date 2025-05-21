import { AbstractMesh, Camera, Nullable, Quaternion, Vector3 } from '@babylonjs/core';

import IBasicMovementControllerConstructorParams from '@mmorpg/interfaces/controllers/player/IBasicMovementController';
import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';
import PlayerCharacter from '@mmorpg/entities/characters/PlayerCharacter';
import MOVEMENT_STATES from '@mmorpg/utils/constants/MOVEMENT_STATES';
import ScenesController from '../ScenesController';

class BasicMovementController {
	private _playerCharacterInstance: PlayerCharacter;
	private _characterMesh: Nullable<AbstractMesh> = null;
	private _kbInputController: Nullable<KeyboardInputController> = null;
	private _camera: Nullable<Camera> = null;
	private _speed = 0.1;
	private _movementState: string;

	constructor(params: IBasicMovementControllerConstructorParams) {
		this._playerCharacterInstance = params.playerCharacter;
		this._movementState = MOVEMENT_STATES.IDLE;
		this._setCharacterMesh();
		this._setKeyboardInputController();
		this._setCamera();
	}

	public update() {
		const forward = this._kbInputController?.isKeyPressed('w');
		const backward = this._kbInputController?.isKeyPressed('s');
		const left = this._kbInputController?.isKeyPressed('a');
		const right = this._kbInputController?.isKeyPressed('d');

		let moveDirection = Vector3.Zero();

		// Calcula movimiento como antes
		if (forward || backward || left || right) {
			// Forward direction of the camera, projected to the XZ plane
			const cameraForward = this._camera?.getForwardRay().direction;
			const forwardXZ = new Vector3(cameraForward?.x, 0, cameraForward?.z).normalize();

			// Base rotated on the Y axis
			const cameraRight = Vector3.Cross(forwardXZ, Vector3.Up()).normalize();

			if (forward) moveDirection = moveDirection.add(forwardXZ);
			if (backward) moveDirection = moveDirection.subtract(forwardXZ);
			if (left) moveDirection = moveDirection.add(cameraRight);
			if (right) moveDirection = moveDirection.subtract(cameraRight);

			moveDirection.normalize();
		}

		const isCurrentlyMoving = !moveDirection.equals(Vector3.Zero());

		if (isCurrentlyMoving) {
			this._movementState = MOVEMENT_STATES.WALKING;
			if (this._characterMesh) {
				const angleY = Math.atan2(moveDirection.x, moveDirection.z) + Math.PI;

				// Rotate the character mesh in the direction of the movement
				this._characterMesh.rotationQuaternion = Quaternion.FromEulerAngles(0, angleY, 0);
				this._characterMesh.moveWithCollisions(moveDirection.scale(this._speed));
			}
		} else {
			this._movementState = MOVEMENT_STATES.IDLE;
		}
	}

	private _setCharacterMesh() {
		if (this._playerCharacterInstance.mesh) {
			this._characterMesh = this._playerCharacterInstance.mesh;
		}
	}

	private _setKeyboardInputController() {
		this._kbInputController = this._playerCharacterInstance.keyboardInputController;
	}

	private _setCamera() {
		const currentScene = ScenesController.getInstance().currentSceneInstance;
		if (currentScene?.activeCamera) {
			this._camera = currentScene?.activeCamera;
		}
	}

	get movementState(): string {
		return this._movementState;
	}
}

export default BasicMovementController;
