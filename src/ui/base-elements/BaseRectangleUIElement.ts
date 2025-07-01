import { Rectangle } from '@babylonjs/gui';

import { IBaseRectangleUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleUIElement';
import IBaseControlUIElement from '@mmorpg/interfaces/ui/base-elements/IBaseControlUIElement';

abstract class BaseRectangleUIElement extends Rectangle implements IBaseControlUIElement {
	private _elementName: string;

	constructor(params: IBaseRectangleUIElementConstructorParams) {
		super(params.elementName);
		this._elementName = params.elementName;
	}

	get elementName(): string {
		return this._elementName;
	}
}

export default BaseRectangleUIElement;
