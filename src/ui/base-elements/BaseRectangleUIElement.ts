import { IBaseRectangleUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseRectangleUIElement';
import BaseControlUIElement from './BaseControlUIElement';

abstract class BaseRectangleUIElement extends BaseControlUIElement {
	constructor(params: IBaseRectangleUIElementConstructorParams) {
		super(params);
	}
}

export default BaseRectangleUIElement;
