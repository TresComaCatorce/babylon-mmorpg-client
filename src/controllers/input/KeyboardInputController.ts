import { KeyboardEventTypes, Observer, KeyboardInfo } from '@babylonjs/core';

import { IKeyboardInputControllerConstructorParams, IToggleCallbacks } from '@mmorpg/interfaces/controllers/input/IKeyboardInputController';
import KEYS_TO_PREVENT_DEFAULT from '@mmorpg/utils/constants/KEYS_TO_PREVENT_DEFAULT';
import BaseController from '@mmorpg/controllers/BaseController';
import BaseScene from '@mmorpg/scenes/BaseScene';

class KeyboardInputController extends BaseController {
	private _scene: BaseScene;
	private _inputMap: Record<string, boolean> = {};
	private _keyboardObserver?: Observer<KeyboardInfo>;

	// Toggle system
	private _toggleKeyStates: Record<string, boolean> = {};
	private _toggleKeyCallbacks: Record<string, IToggleCallbacks> = {};
	private _toggleKeyValues: Record<string, boolean> = {};

	constructor(params: IKeyboardInputControllerConstructorParams) {
		super();
		this._scene = params.scene;
		this._onKeyPressedCallback = this._onKeyPressedCallback.bind(this);
		this._subscribeToKeyPressed();
	}

	public isKeyPressed(key: string): boolean {
		return !!this._inputMap[key.toLowerCase()];
	}

	public addToggleKey(key: string, callbacks: IToggleCallbacks): void {
		const k = key.toLowerCase();
		this._toggleKeyCallbacks[k] = callbacks;
		this._toggleKeyStates[k] = false;
		this._toggleKeyValues[k] = false;
	}

	public removeToggleKey(key: string): void {
		const k = key.toLowerCase();
		delete this._toggleKeyCallbacks[k];
		delete this._toggleKeyStates[k];
		delete this._toggleKeyValues[k];
	}

	public isToggleOn(key: string): boolean {
		return !!this._toggleKeyValues[key.toLowerCase()];
	}

	public dispose(): void {
		if (this._keyboardObserver) {
			this._scene.onKeyboardObservable.remove(this._keyboardObserver);
			this._keyboardObserver = undefined;
		}
	}

	private _onKeyPressedCallback(kbInfo: KeyboardInfo): void {
		const eventKeyCode = kbInfo.event.key.toLowerCase();
		const isKeyDownEventType = kbInfo.type === KeyboardEventTypes.KEYDOWN;
		this._onUpdateKeyPressedLogic(kbInfo, eventKeyCode, isKeyDownEventType);
		this._onUpdateToggleLogic(eventKeyCode, isKeyDownEventType);
	}

	private _onUpdateKeyPressedLogic(kbInfo: KeyboardInfo, eventKeyCode: string, isKeyDownEventType: boolean) {
		if (KEYS_TO_PREVENT_DEFAULT.includes(eventKeyCode)) {
			kbInfo.event.preventDefault();
		}

		this._inputMap[eventKeyCode] = isKeyDownEventType;
	}

	private _onUpdateToggleLogic(eventKeyCode: string, isKeyDownEventType: boolean) {
		if (this._toggleKeyCallbacks[eventKeyCode]) {
			const wasPressed = this._toggleKeyStates[eventKeyCode];

			//Only activate if the key has just been pressed (and is not being repeated)
			if (isKeyDownEventType && !wasPressed) {
				this._toggleKeyValues[eventKeyCode] = !this._toggleKeyValues[eventKeyCode];

				const toggle = this._toggleKeyCallbacks[eventKeyCode];
				if (this._toggleKeyValues[eventKeyCode]) {
					toggle.onSwitchON();
				} else {
					toggle.onSwitchOFF();
				}
			}

			this._toggleKeyStates[eventKeyCode] = isKeyDownEventType;
		}
	}

	private _subscribeToKeyPressed(): void {
		this._keyboardObserver = this._scene.onKeyboardObservable.add(this._onKeyPressedCallback);
	}
}

export default KeyboardInputController;
