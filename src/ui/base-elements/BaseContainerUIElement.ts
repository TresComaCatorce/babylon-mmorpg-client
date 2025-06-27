import { AdvancedDynamicTexture, Container } from '@babylonjs/gui';

import { IBaseContainerUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseContainerUIElement';
import IBaseControlUIElement from '@mmorpg/interfaces/ui/base-elements/IBaseControlUIElement';

abstract class BaseContainerUIElement extends Container implements IBaseControlUIElement {
	private _elementName: string;
	private _guiTexture: AdvancedDynamicTexture;

	constructor(params: IBaseContainerUIElementConstructorParams) {
		super(params.elementName);
		this._elementName = params.elementName;
		this._guiTexture = params.guiTexture;
	}

	get elementName(): string {
		return this._elementName;
	}
}

export default BaseContainerUIElement;
