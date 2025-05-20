import {
	ArcRotateCamera,
	AbstractMesh,
	Scalar,
	PointerEventTypes,
	TransformNode,
	Observer,
	PointerInfo,
	Nullable,
} from '@babylonjs/core';

import { IFollowPlayerCameraConstructorParams } from '@mmorpg/interfaces/camera/IFollowPlayerCamera';

class FollowPlayerCamera extends ArcRotateCamera {
	private _minZoom = 3;
	private _maxZoom = 15;
	private _minY = 1;
	private _maxY = 1.2;

	private _playerMesh: AbstractMesh;
	private _pointerObserver: Nullable<Observer<PointerInfo>> = null;
	private _fakeTarget!: TransformNode;

	private _isRotating = false;
	private _lastPointerX = 0;
	private _lastPointerY = 0;

	constructor(params: IFollowPlayerCameraConstructorParams) {
		const alpha = 0;
		const beta = 1.2;
		const radius = 10;
		const target = params.playerMesh.position.clone();

		super('FollowPlayerCamera', alpha, beta, radius, target, params.scene);
		this._playerMesh = params.playerMesh;

		this._configureCamera();
		this._createFakeTargetToFollow();
		this._setupPointerControls();
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
					if (event.button === 1) {
						// botón del medio
						this._isRotating = true;
						this._lastPointerX = event.clientX;
						this._lastPointerY = event.clientY;
					}
					break;
				}
				case PointerEventTypes.POINTERUP: {
					if (event.button === 1) {
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

						// Limitar el ángulo vertical (beta)
						this.beta = Scalar.Clamp(this.beta, this._minY, this._maxY);

						this._lastPointerX = event.clientX;
						this._lastPointerY = event.clientY;
					}
					break;
				}
				case PointerEventTypes.POINTERWHEEL: {
					const delta = (event as WheelEvent).deltaY > 0 ? 1 : -1;
					this.radius = Scalar.Clamp(this.radius + delta, this._minZoom, this._maxZoom);
					break;
				}
			}
		});
	}

	public dispose(): void {
		if (this._pointerObserver) {
			this.getScene().onPointerObservable.remove(this._pointerObserver);
		}
		super.dispose();
	}
}

export default FollowPlayerCamera;
