import { FollowCamera, Scene, AbstractMesh, Vector3 } from '@babylonjs/core';

class FollowPlayerCamera extends FollowCamera {
	constructor(scene: Scene, target: AbstractMesh) {
		super('PlayerFollowCamera', new Vector3(0, 5, -10), scene);
		console.log('FollowPlayerCamera constructor: ', target);

		// Configure camera
		this.lockedTarget = target;
		this.radius = 10;
		this.heightOffset = 4;
		this.rotationOffset = 180;
		this.cameraAcceleration = 0.05;
		this.maxCameraSpeed = 10;
	}

	setRadius(value: number) {
		this.radius = value;
	}

	setHeightOffset(value: number) {
		this.heightOffset = value;
	}

	setRotationOffset(value: number) {
		this.rotationOffset = value;
	}
}

export default FollowPlayerCamera;
