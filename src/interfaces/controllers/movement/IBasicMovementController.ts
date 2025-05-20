import { AbstractMesh, Camera } from '@babylonjs/core';

import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';

interface IBasicMovementControllerConstructorParams {
	mesh: AbstractMesh;
	visualMesh: AbstractMesh;
	kbInputController: KeyboardInputController;
	camera: Camera;
}

export default IBasicMovementControllerConstructorParams;
