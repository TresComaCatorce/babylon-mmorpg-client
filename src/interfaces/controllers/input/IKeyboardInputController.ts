import BaseScene from '@mmorpg/scenes/base/BaseScene';

interface IKeyboardInputControllerConstructorParams {
	scene: BaseScene;
}

interface IToggleCallbacks {
	onSwitchON: () => void;
	onSwitchOFF: () => void;
}

interface IActionCallbacks {
	onKeyPressed: () => void;
	onKeyReleased?: () => void;
}

export { IKeyboardInputControllerConstructorParams, IToggleCallbacks, IActionCallbacks };
