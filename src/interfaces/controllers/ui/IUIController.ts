import { Control } from '@babylonjs/gui';

interface IAddUIElementParams {
	uiElementName: string;
	uiElementInstance: Control;
}

interface IRemoveUIElementParams {
	uiElementName: string;
}

export { IAddUIElementParams, IRemoveUIElementParams };
