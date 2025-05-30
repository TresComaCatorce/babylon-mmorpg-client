import { Container } from '@babylonjs/gui';

import { IBaseContainerUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseContainerUIElements';

abstract class BaseContainerUIElement extends Container {
	private _elementName: string;

	constructor(params: IBaseContainerUIElementConstructorParams) {
		super(params.elementName);
		this._elementName = params.elementName;
	}

	get elementName(): string {
		return this._elementName;
	}
}

export default BaseContainerUIElement;
