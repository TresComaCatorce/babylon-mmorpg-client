import { Control } from '@babylonjs/gui';

interface IBaseControlGUIElement extends Control {
	elementName: string;
}

interface IBaseControlGUIElementConstructorParams {
	elementName: string;
}

export default IBaseControlGUIElement;
export { IBaseControlGUIElementConstructorParams };
