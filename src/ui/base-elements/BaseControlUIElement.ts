import { Control } from '@babylonjs/gui';

import { IBaseControlUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseControlUIElement';

abstract class BaseControlUIElement extends Control {
	private _elementName: string;

	constructor(params: IBaseControlUIElementConstructorParams) {
		super(params.elementName);
		this._elementName = params.elementName;
	}

	get elementName(): string {
		return this._elementName;
	}
}

export default BaseControlUIElement;
