import { AdvancedDynamicTexture, Rectangle } from '@babylonjs/gui';

import { IBaseRectangleUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleUIElement';
import IBaseControlUIElement from '@mmorpg/interfaces/ui/base-elements/IBaseControlUIElement';

abstract class BaseRectangleUIElement extends Rectangle implements IBaseControlUIElement {
	private _elementName: string;
	protected _guiTexture: AdvancedDynamicTexture;

	constructor(params: IBaseRectangleUIElementConstructorParams) {
		super(params.elementName);
		this._elementName = params.elementName;
		this._guiTexture = params.guiTexture;
	}

	get elementName(): string {
		return this._elementName;
	}
}

export default BaseRectangleUIElement;
