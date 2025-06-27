import { AdvancedDynamicTexture, Control } from '@babylonjs/gui';

interface IBaseControlUIElement extends Control {
	elementName: string;
}

interface IBaseControlUIElementConstructorParams {
	elementName: string;
	guiTexture: AdvancedDynamicTexture;
}

export default IBaseControlUIElement;
export { IBaseControlUIElementConstructorParams };
