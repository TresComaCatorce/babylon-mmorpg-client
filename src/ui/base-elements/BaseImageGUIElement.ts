import { Image } from '@babylonjs/gui';

import { IBaseImageGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseImageGUIElement';
import IBaseControlGUIElement from '@mmorpg/interfaces/ui/base-elements/IBaseControlGUIElement';

abstract class BaseImageGUIElement extends Image implements IBaseControlGUIElement {
	private _elementName: string;

	constructor(params: IBaseImageGUIElementConstructorParams) {
		super(params.elementName, params.imageUrl);
		this._elementName = params.elementName;
	}

	get elementName(): string {
		return this._elementName;
	}
}

export default BaseImageGUIElement;
