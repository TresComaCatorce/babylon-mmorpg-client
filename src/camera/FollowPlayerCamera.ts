import { ArcRotateCamera, AbstractMesh, Scalar, PointerEventTypes, TransformNode, Observer, PointerInfo, Nullable } from '@babylonjs/core';

import { IFollowPlayerCameraConstructorParams } from '@mmorpg/interfaces/camera/IFollowPlayerCamera';

class FollowPlayerCamera extends ArcRotateCamera {
	private _minZoom: number = 3;
	private _maxZoom: number = 15;
	private _minY: number = 1;
	private _maxY: number = 1.2;
	private _targetRadius: number = 10;
	private _zoomSmoothSpeed: number = 0.15;
	private _clickToMoveCamera: number = 0; // 0=LeftClick | 1=MiddleClick | 2=RightClick

	private _playerMesh: AbstractMesh;
	private _pointerObserver: Nullable<Observer<PointerInfo>> = null;
	private _fakeTarget!: TransformNode;

	private _isRotating = false;
	private _lastPointerX = 0;
	private _lastPointerY = 0;

	constructor(params: IFollowPlayerCameraConstructorParams) {
		const alpha = -Math.PI / 2;
		const beta = 1.2;
		const radius = 10;
		const target = params.playerMesh.position.clone();

		super('FollowPlayerCamera', alpha, beta, radius, target, params.scene);
		this._playerMesh = params.playerMesh;
		this._targetRadius = this.radius;

		this._configureCamera();
		this._createFakeTargetToFollow();
		this._setupPointerControls();
		this._addDebugButtons();
	}

	public update(): void {
		this.radius = Scalar.Lerp(this.radius, this._targetRadius, this._zoomSmoothSpeed);
	}

	public dispose(): void {
		if (this._pointerObserver) {
			this.getScene().onPointerObservable.remove(this._pointerObserver);
		}
		super.dispose();
	}

	private _configureCamera() {
		// Remove default inputs
		this.inputs.clear();

		// Avoid camera revertion
		this.allowUpsideDown = false;

		// Setup limits
		this.lowerRadiusLimit = this._minZoom;
		this.upperRadiusLimit = this._maxZoom;
		this.lowerBetaLimit = this._minY;
		this.upperBetaLimit = this._maxY;
	}

	private _createFakeTargetToFollow() {
		this._fakeTarget = new TransformNode('cameraTarget');
		this._fakeTarget.parent = this._playerMesh;
		this._fakeTarget.position.y = 1;
		this.setTarget(this._fakeTarget);
	}

	private _setupPointerControls() {
		this._pointerObserver = this._scene.onPointerObservable.add((pointerInfo) => {
			const event = pointerInfo.event;

			switch (pointerInfo.type) {
				case PointerEventTypes.POINTERDOWN: {
					if (event.button === this._clickToMoveCamera) {
						this._isRotating = true;
						this._lastPointerX = event.clientX;
						this._lastPointerY = event.clientY;
					}
					break;
				}
				case PointerEventTypes.POINTERUP: {
					if (event.button === this._clickToMoveCamera) {
						this._isRotating = false;
					}
					break;
				}
				case PointerEventTypes.POINTERMOVE: {
					if (this._isRotating) {
						const offsetX = event.clientX - this._lastPointerX;
						const offsetY = event.clientY - this._lastPointerY;

						this.alpha -= offsetX * 0.005;
						this.beta -= offsetY * 0.005;

						// Limit the vertical angle (beta)
						this.beta = Scalar.Clamp(this.beta, this._minY, this._maxY);

						this._lastPointerX = event.clientX;
						this._lastPointerY = event.clientY;
					}
					break;
				}
				case PointerEventTypes.POINTERWHEEL: {
					const wheelEvent = event as WheelEvent;
					const delta = Scalar.Clamp(wheelEvent.deltaY * 0.01, -1, 1);
					this._targetRadius = Scalar.Clamp(this._targetRadius + delta, this._minZoom, this._maxZoom);
					break;
				}
			}
		});
	}

	private _addDebugButtons() {
		if (process.env.NODE_ENV === 'development') {
			// const buttonRotationMeshPlus1 = document.createElement('button');
			// buttonRotationMeshPlus1.innerText = 'Model rotation +=1';
			// buttonRotationMeshPlus1.style.position = 'absolute';
			// buttonRotationMeshPlus1.style.top = '92%';
			// buttonRotationMeshPlus1.style.left = '85%';
			// buttonRotationMeshPlus1.style.transform = 'translate(-50%, -50%)';
			// buttonRotationMeshPlus1.onclick = () => {
			// 	console.log('FollowPlayerCamera.ts | +1 | : ', this.radius);
			// 	this._playerMesh.rotate(Vector3.Up(), Tools.ToRadians(5));
			// };
			// document.body.appendChild(buttonRotationMeshPlus1);
		}
	}
}

export default FollowPlayerCamera;
