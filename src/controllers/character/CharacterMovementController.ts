import { Vector3 } from '@babylonjs/core';

import { ICharacterMovementControllerConstructorParams } from '@mmorpg/interfaces/controllers/character/ICharacterMovementController';
import BaseCharacterController from '@mmorpg/controllers/base/BaseCharacterController';
import MOVEMENT_STATES from '@mmorpg/utils/constants/MOVEMENT_STATES';

abstract class CharacterMovementController extends BaseCharacterController {
	protected _movementState: string = MOVEMENT_STATES.IDLE;
	protected _movementDirection: Vector3 = Vector3.Zero();
	protected _currentSpeed: number = 0;
	protected _accelerationProgress: number = 0;
	protected _isMovingForward: boolean = false;
	protected _isMovingBackward: boolean = false;
	protected _isMovingLeft: boolean = false;
	protected _isMovingRight: boolean = false;
	protected _isMoving: boolean = false;
	protected _isRunning: boolean = false;
	protected _isRunningLocked: boolean = false;

	constructor(params: ICharacterMovementControllerConstructorParams) {
		super(params);
	}
}

export default CharacterMovementController;
