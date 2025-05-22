import { KeyboardEventTypes, Observer, KeyboardInfo, Nullable } from '@babylonjs/core';

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
	private _toggleStatusElement: Nullable<HTMLElement> = null;
	private _toggleDisplayNames: Record<string, string> = {};

	constructor(params: IKeyboardInputControllerConstructorParams) {
		super();
		this._scene = params.scene;
		this._onKeyPressedCallback = this._onKeyPressedCallback.bind(this);
		this._setToggleStatusDebugInspector();
		this._subscribeToKeyPressed();
	}

	public isKeyPressed(key: string): boolean {
		return !!this._inputMap[key.toLowerCase()];
	}

	public addToggleKey(key: string, callbacks: IToggleCallbacks, displayName?: string): void {
		const k = key.toLowerCase();
		this._toggleKeyCallbacks[k] = callbacks;

		if (!(k in this._toggleKeyStates)) this._toggleKeyStates[k] = false;
		if (!(k in this._toggleKeyValues)) this._toggleKeyValues[k] = false;

		if (displayName) {
			this._toggleDisplayNames[k] = displayName;
		}

		this._renderToggleDebugStatus();
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

	private _setToggleStatusDebugInspector(): void {
		if (process.env.NODE_ENV === 'development') {
			this._toggleStatusElement = document.createElement('div');
			this._toggleStatusElement.id = 'toggle-debug-status';
			document.body.appendChild(this._toggleStatusElement);
			this._renderToggleDebugStatus();
		}
	}

	private _subscribeToKeyPressed(): void {
		this._keyboardObserver = this._scene.onKeyboardObservable.add(this._onKeyPressedCallback);
	}

	private _onKeyPressedCallback(kbInfo: KeyboardInfo): void {
		const eventKeyCode = kbInfo.event.key.toLowerCase();
		const isKeyDownEventType = kbInfo.type === KeyboardEventTypes.KEYDOWN;
		this._onUpdateKeyPressedLogic(kbInfo, eventKeyCode, isKeyDownEventType);
		this._onUpdateToggleLogic(eventKeyCode, isKeyDownEventType);
		this._renderToggleDebugStatus();
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

	private _renderToggleDebugStatus(): void {
		if (process.env.NODE_ENV === 'development') {
			if (!this._toggleStatusElement) return;

			const entries = Object.keys(this._toggleKeyValues).map((key) => {
				const isOn = this._toggleKeyValues[key];
				const label = this._toggleDisplayNames[key] || key.toUpperCase();
				return `<div><span class="yellow-color">[${key.toUpperCase()}]</span> ${label}: ${isOn ? '<span class="green-color">ON</span>' : '<span class="red-color">OFF</span>'}</div>`;
			});

			this._toggleStatusElement.innerHTML = `<div><b>Toggle Values</b></div>` + entries.join();
		}
	}
}

export default KeyboardInputController;
