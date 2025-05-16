import { FollowCamera, Scene, AbstractMesh, Vector3 } from '@babylonjs/core';

class FollowPlayerCamera {
	private camera: FollowCamera;

	constructor(scene: Scene, target: AbstractMesh) {
		// Create Babylon camera
		this.camera = new FollowCamera(
			'PlayerFollowCamera',
			new Vector3(0, 5, -10),
			scene,
		);

		// Configure camera
		this.camera.lockedTarget = target;
		this.camera.radius = 10;
		this.camera.heightOffset = 4;
		this.camera.rotationOffset = 180;
		this.camera.cameraAcceleration = 0.05;
		this.camera.maxCameraSpeed = 10;

		// Active camera
		scene.activeCamera = this.camera;
		this.camera.attachControl(true);
	}

	setRadius(value: number) {
		this.camera.radius = value;
	}

	setHeightOffset(value: number) {
		this.camera.heightOffset = value;
	}

	setRotationOffset(value: number) {
		this.camera.rotationOffset = value;
	}

	setTarget(mesh: AbstractMesh) {
		this.camera.lockedTarget = mesh;
	}
}

export default FollowPlayerCamera;
