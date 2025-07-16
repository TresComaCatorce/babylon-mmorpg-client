import { StackPanel } from '@babylonjs/gui';

import { IBaseStackPanelGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseStackPanelGUIElement';
import IBaseControlGUIElement from '@mmorpg/interfaces/ui/base-elements/IBaseControlGUIElement';

abstract class BaseStackPanelGUIElement extends StackPanel implements IBaseControlGUIElement {
	private _elementName: string;

	constructor(params: IBaseStackPanelGUIElementConstructorParams) {
		super(params.elementName);
		this._elementName = params.elementName;
	}

	get elementName(): string {
		return this._elementName;
	}
}

export default BaseStackPanelGUIElement;
