import { AbstractMesh } from '@babylonjs/core';

import KeyboardInputController from '@mmorpg/controllers/input/KeyboardInputController';

interface IBasicMovementControllerConstructorParams {
	mesh: AbstractMesh;
	kbInputController: KeyboardInputController;
}

export default IBasicMovementControllerConstructorParams;
