import { IBaseNavbarGUIConstructorParams } from '@mmorpg/interfaces/ui/navbars/IBaseNavbarGUI';
import BaseContainerGUIElement from '@mmorpg/ui/base-elements/BaseContainerGUIElement';

abstract class BaseNavbarGUI extends BaseContainerGUIElement {
	constructor(params: IBaseNavbarGUIConstructorParams) {
		super(params);
	}
}

export default BaseNavbarGUI;
