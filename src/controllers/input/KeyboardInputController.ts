import { KeyboardEventTypes, Observer, KeyboardInfo, Nullable } from '@babylonjs/core';

import KEYS_TO_PREVENT_DEFAULT from '@mmorpg/utils/constants/KEYS_TO_PREVENT_DEFAULT';
import {
	IKeyboardInputControllerConstructorParams,
	IToggleCallbacks,
	IActionCallbacks,
} from '@mmorpg/interfaces/controllers/input/IKeyboardInputController';
import BaseController from '@mmorpg/controllers/BaseController';
import BaseScene from '@mmorpg/scenes/BaseScene';

/**
 * TODO: Implement singleton on this controller.
 */
class KeyboardInputController extends BaseController {
	private _scene: BaseScene;
	private _inputMap: Record<string, boolean> = {};
	private _keyboardObserver?: Observer<KeyboardInfo>;

	// Toggle key system
	private _toggleKeyStates: Record<string, boolean> = {};
	private _toggleKeyCallbacks: Record<string, IToggleCallbacks> = {};
	private _toggleKeyValues: Record<string, boolean> = {};
	private _toggleDisplayNames: Record<string, string> = {};
	private _toggleStatusDebugInspectorElement: Nullable<HTMLElement> = null;

	// Key action system
	private _keyActionStates: Record<string, boolean> = {};
	private _keyActionCallbacks: Record<string, IActionCallbacks> = {};

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

	public addKeyAction(key: string, callback: IActionCallbacks): void {
		const k = key.toLowerCase();
		this._keyActionCallbacks[k] = callback;
		this._keyActionStates[k] = false;
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
		// if (process.env.NODE_ENV === 'development') {
		this._toggleStatusDebugInspectorElement = document.createElement('div');
		this._toggleStatusDebugInspectorElement.id = 'toggle-debug-status';
		document.body.appendChild(this._toggleStatusDebugInspectorElement);
		this._renderToggleDebugStatus();
		// }
	}

	private _subscribeToKeyPressed(): void {
		this._keyboardObserver = this._scene.onKeyboardObservable.add(this._onKeyPressedCallback);
	}

	private _onKeyPressedCallback(kbInfo: KeyboardInfo): void {
		const eventKeyCode = kbInfo.event.key.toLowerCase();
		const isKeyDownEventType = kbInfo.type === KeyboardEventTypes.KEYDOWN;
		this._onUpdateKeyPressedLogic(kbInfo, eventKeyCode, isKeyDownEventType);
		this._onUpdateToggleLogic(eventKeyCode, isKeyDownEventType);
		this._onUpdateKeyActionLogic(eventKeyCode, kbInfo);
		this._renderToggleDebugStatus();
	}

	private _onUpdateKeyPressedLogic(kbInfo: KeyboardInfo, eventKeyCode: string, isKeyDownEventType: boolean) {
		if (KEYS_TO_PREVENT_DEFAULT.includes(eventKeyCode)) {
			kbInfo.event.preventDefault();
		}

		this._inputMap[eventKeyCode] = isKeyDownEventType;
		console.log(`this._inputMap [Key: "${eventKeyCode}" Event: "${kbInfo.type === KeyboardEventTypes.KEYDOWN ? 'KEYDOWN' : 'KEYUP'}"]`);
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

	private _onUpdateKeyActionLogic(eventKeyCode: string, kbInfo: KeyboardInfo): void {
		const isKeyDownEventType = kbInfo.type === KeyboardEventTypes.KEYDOWN;
		const isKeyUpEventType = kbInfo.type === KeyboardEventTypes.KEYUP;
		const callbacks = this._keyActionCallbacks[eventKeyCode];
		if (!callbacks) return;

		const domEvent = kbInfo.event as KeyboardEvent;

		// Ejecutar onKeyPressed solo si es una nueva pulsación y no repetida por mantener presionado
		if (isKeyDownEventType && !domEvent.repeat && callbacks.onKeyPressed) {
			callbacks.onKeyPressed();
		}

		// Ejecutar onKeyReleased solo si estaba presionada y ahora fue soltada
		if (isKeyUpEventType && callbacks.onKeyReleased) {
			callbacks.onKeyReleased();
		}

		// Actualizar estado
		this._keyActionStates[eventKeyCode] = isKeyDownEventType;
	}

	private _renderToggleDebugStatus(): void {
		// if (process.env.NODE_ENV === 'development') {
		if (!this._toggleStatusDebugInspectorElement) return;

		const entries = Object.keys(this._toggleKeyValues).map((key) => {
			const isOn = this._toggleKeyValues[key];
			const label = this._toggleDisplayNames[key] || key.toUpperCase();
			return `<div><span class="yellow-color">[${key.toUpperCase()}]</span> ${label}: ${isOn ? '<span class="green-color">ON</span>' : '<span class="red-color">OFF</span>'}</div>`;
		});

		this._toggleStatusDebugInspectorElement.innerHTML = `<div><b>[DEBUG] Toggle Values</b></div>` + entries.join('');
		// }
	}
}

export default KeyboardInputController;
