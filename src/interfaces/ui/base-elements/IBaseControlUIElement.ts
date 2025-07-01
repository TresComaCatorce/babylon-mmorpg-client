import { Control } from '@babylonjs/gui';

interface IBaseControlUIElement extends Control {
	elementName: string;
}

interface IBaseControlUIElementConstructorParams {
	elementName: string;
}

export default IBaseControlUIElement;
export { IBaseControlUIElementConstructorParams };
