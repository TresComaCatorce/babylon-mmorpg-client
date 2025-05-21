import { KeyboardEventTypes, Observer, KeyboardInfo } from '@babylonjs/core';

import { IKeyboardInputControllerConstructorParams } from '@mmorpg/interfaces/controllers/input/IKeyboardInputController';
import KEYS_TO_PREVENT_DEFAULT from '@mmorpg/utils/constants/KEYS_TO_PREVENT_DEFAULT';
import BaseController from '@mmorpg/controllers/BaseController';
import BaseScene from '@mmorpg/scenes/BaseScene';

class KeyboardInputController extends BaseController {
	private _scene: BaseScene;
	private _inputMap: Record<string, boolean> = {};
	private _keyboardObserver?: Observer<KeyboardInfo>;

	constructor(params: IKeyboardInputControllerConstructorParams) {
		super();
		this._scene = params.scene;
		this._onKeyPressedCallback = this._onKeyPressedCallback.bind(this);
		this._subscribeToKeyPressed();
	}

	public isKeyPressed(key: string): boolean {
		return !!this._inputMap[key.toLowerCase()];
	}

	public dispose(): void {
		if (this._keyboardObserver) {
			this._scene.onKeyboardObservable.remove(this._keyboardObserver);
			this._keyboardObserver = undefined;
		}
	}

	private _onKeyPressedCallback(kbInfo: KeyboardInfo) {
		const key = kbInfo.event.key.toLowerCase();
		// console.log(`KeyboardInputController.ts | Key "${key}" pressed`);

		if (KEYS_TO_PREVENT_DEFAULT.includes(key)) {
			kbInfo.event.preventDefault();
		}

		this._inputMap[key] = kbInfo.type === KeyboardEventTypes.KEYDOWN;
	}

	private _subscribeToKeyPressed() {
		this._keyboardObserver = this._scene.onKeyboardObservable.add(this._onKeyPressedCallback);
	}
}

export default KeyboardInputController;
