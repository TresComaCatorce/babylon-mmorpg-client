import { IBaseContainerUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseContainerUIElement';
import BaseControlUIElement from './BaseControlUIElement';

abstract class BaseContainerUIElement extends BaseControlUIElement {
	constructor(params: IBaseContainerUIElementConstructorParams) {
		super(params);
	}
}

export default BaseContainerUIElement;
