import { AdvancedDynamicTexture, Control } from '@babylonjs/gui';

interface IToolTipManagerInitializeParams {
	guiTexture: AdvancedDynamicTexture;
}

interface IToolTipManagerAttachParams {
	owner: Control;
	content: Control;
}

export { IToolTipManagerInitializeParams, IToolTipManagerAttachParams };
