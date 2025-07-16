import { ScrollViewer } from '@babylonjs/gui';

import { IBaseScrollViewerGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseScrollViewerGUIElement';
import IBaseControlGUIElement from '@mmorpg/interfaces/ui/base-elements/IBaseControlGUIElement';

abstract class BaseScrollViewerGUIElement extends ScrollViewer implements IBaseControlGUIElement {
	private _elementName: string;

	constructor(params: IBaseScrollViewerGUIElementConstructorParams) {
		super(params.elementName);
		this._elementName = params.elementName;
	}

	get elementName(): string {
		return this._elementName;
	}
}

export default BaseScrollViewerGUIElement;
