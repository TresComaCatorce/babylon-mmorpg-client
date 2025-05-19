import {
	FollowCamera,
	Scene,
	AbstractMesh,
	Vector3,
	TransformNode,
	FollowCameraPointersInput,
} from '@babylonjs/core';

class FollowPlayerCamera extends FollowCamera {
	private _oldRadiusValue: number = 0;
	private _cameraPointersInput: FollowCameraPointersInput;

	constructor(scene: Scene, targetMesh: AbstractMesh) {
		super('PlayerFollowCamera', new Vector3(0, 5, -10), scene);
		this._cameraPointersInput = <FollowCameraPointersInput>this.inputs.attached.pointers;

		this._setTargetToFollow(targetMesh);
		this._setInitialRadiusValues();
		this._setInitialHeightValues();
		this._setInitialRotationValues();
		this._setInitialAcelerationAndSpeed();
		this._setMouseButtonsToMoveCamera();
		this._setCameraSensitivity();
		this._addDebugButtons();
	}

	private _setTargetToFollow(target: AbstractMesh) {
		const cameraTarget = new TransformNode('cameraTarget');
		cameraTarget.parent = target;
		cameraTarget.position.y = 1;
		this.lockedTarget = <AbstractMesh>cameraTarget;
	}

	private _setInitialRadiusValues() {
		this.radius = 10;
		this._oldRadiusValue = this.radius;
		this.lowerRadiusLimit = 3;
		this.upperRadiusLimit = 15;
	}

	private _setInitialHeightValues() {
		this.heightOffset = 5;
		this.lowerHeightOffsetLimit = 3;
		this.upperHeightOffsetLimit = 7;
	}

	private _setInitialRotationValues() {
		this.rotationOffset = 180;
	}

	private _setInitialAcelerationAndSpeed() {
		this.cameraAcceleration = 0.2;
		this.maxCameraSpeed = 10;
	}

	private _setMouseButtonsToMoveCamera() {
		this._cameraPointersInput.buttons = [0]; // 0=LeftClick 1=MiddleClick 2=RightClick
	}

	private _setCameraSensitivity() {
		this._cameraPointersInput.angularSensibilityX = 2.7;
		this._cameraPointersInput.angularSensibilityY = 5;
	}

	private _addDebugButtons() {
		if (process.env.NODE_ENV === 'development') {
			const buttonHeightPlus1 = document.createElement('button');
			buttonHeightPlus1.innerText = 'Height +=1';
			buttonHeightPlus1.style.position = 'absolute';
			buttonHeightPlus1.style.top = '92%';
			buttonHeightPlus1.style.left = '95%';
			buttonHeightPlus1.style.transform = 'translate(-50%, -50%)';
			buttonHeightPlus1.onclick = () => {
				this.heightOffset += 0.1;
				console.log('FollowPlayerCamera.ts | +0.1 |heightOffset: ', this.heightOffset);
			};
			document.body.appendChild(buttonHeightPlus1);

			const buttonHeightMinus1 = document.createElement('button');
			buttonHeightMinus1.innerText = 'Height -=1';
			buttonHeightMinus1.style.position = 'absolute';
			buttonHeightMinus1.style.top = '95%';
			buttonHeightMinus1.style.left = '95%';
			buttonHeightMinus1.style.transform = 'translate(-50%, -50%)';
			buttonHeightMinus1.onclick = () => {
				this.heightOffset -= 0.1;
				console.log('FollowPlayerCamera.ts | -0.1 | heightOffset: ', this.heightOffset);
			};
			document.body.appendChild(buttonHeightMinus1);

			const buttonRadiusPlus1 = document.createElement('button');
			buttonRadiusPlus1.innerText = 'Radius +=1';
			buttonRadiusPlus1.style.position = 'absolute';
			buttonRadiusPlus1.style.top = '92%';
			buttonRadiusPlus1.style.left = '90%';
			buttonRadiusPlus1.style.transform = 'translate(-50%, -50%)';
			buttonRadiusPlus1.onclick = () => {
				this.radius += 1;
				console.log('FollowPlayerCamera.ts | +1 | radius: ', this.radius);
			};
			document.body.appendChild(buttonRadiusPlus1);

			const buttonRadiusMinus1 = document.createElement('button');
			buttonRadiusMinus1.innerText = 'Radius -=1';
			buttonRadiusMinus1.style.position = 'absolute';
			buttonRadiusMinus1.style.top = '95%';
			buttonRadiusMinus1.style.left = '90%';
			buttonRadiusMinus1.style.transform = 'translate(-50%, -50%)';
			buttonRadiusMinus1.onclick = () => {
				this.radius -= 1;
				console.log('FollowPlayerCamera.ts | -1 | radius: ', this.radius);
			};
			document.body.appendChild(buttonRadiusMinus1);
		}
	}

	public update() {
		super.update();

		// Executed if "radius" change
		if (this.radius !== this._oldRadiusValue) {
			this._oldRadiusValue = this.radius;
			const [newMin, newMax] = this._getMinMaxHeightFromRadius(this.radius);
			this.lowerHeightOffsetLimit = newMin;
			this.upperHeightOffsetLimit = newMax;
		}
	}

	private _getMinMaxHeightFromRadius(radius: number): [number, number] {
		const min = radius <= 4 ? 0 : Math.min(3, Math.floor((radius - 5) / 2.5) + 1);
		const max = radius <= 4 ? 2 : 2 + (radius - 5) * 0.7;
		return [Math.min(min, 3), Math.min(max, 10)];
	}
}

export default FollowPlayerCamera;
