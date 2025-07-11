import { Container } from '@babylonjs/gui';

import { IBaseContainerGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseContainerGUIElement';
import IBaseControlUIElement from '@mmorpg/interfaces/ui/base-elements/IBaseControlUIElement';

abstract class BaseContainerGUIElement extends Container implements IBaseControlUIElement {
	private _elementName: string;

	constructor(params: IBaseContainerGUIElementConstructorParams) {
		super(params.elementName);
		this._elementName = params.elementName;
	}

	get elementName(): string {
		return this._elementName;
	}
}

export default BaseContainerGUIElement;
