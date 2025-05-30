import { IBaseMainPanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/IBaseMainPanelGUI';
import BaseContainerUIElement from '@mmorpg/ui/base-elements/BaseContainerUIElement';

abstract class BaseMainPanelGUI extends BaseContainerUIElement {
	constructor(params: IBaseMainPanelGUIConstructorParams) {
		super(params);
	}
}

export default BaseMainPanelGUI;
