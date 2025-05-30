import { IBaseNavbarGUIConstructorParams } from '@mmorpg/interfaces/ui/navbars/IBaseNavbarGUI';
import BaseContainerUIElement from '@mmorpg/ui/base-elements/BaseContainerUIElement';

abstract class BaseNavbarGUI extends BaseContainerUIElement {
	constructor(params: IBaseNavbarGUIConstructorParams) {
		super(params);
	}
}

export default BaseNavbarGUI;
