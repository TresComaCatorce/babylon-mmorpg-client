import { AbstractMesh } from '@babylonjs/core';

import BaseScene from '@mmorpg/scenes/base/BaseScene';

interface IFollowPlayerCameraConstructorParams {
	scene: BaseScene;
	playerMesh: AbstractMesh;
}

export { IFollowPlayerCameraConstructorParams };
