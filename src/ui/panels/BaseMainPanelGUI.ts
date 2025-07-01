import BaseDraggableRectangleUIElement from '@mmorpg/ui/base-elements/BaseDraggableRectangleUIElement';
import { IBaseMainPanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/IBaseMainPanelGUI';

abstract class BaseMainPanelGUI extends BaseDraggableRectangleUIElement {
	constructor(params: IBaseMainPanelGUIConstructorParams) {
		super(params);
	}
}

export default BaseMainPanelGUI;
