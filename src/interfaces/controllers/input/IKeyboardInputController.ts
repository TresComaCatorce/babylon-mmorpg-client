import BaseScene from '@mmorpg/scenes/BaseScene';

interface IKeyboardInputControllerConstructorParams {
	scene: BaseScene;
}

interface IToggleCallbacks {
	onSwitchON: () => void;
	onSwitchOFF: () => void;
}

export { IKeyboardInputControllerConstructorParams, IToggleCallbacks };
