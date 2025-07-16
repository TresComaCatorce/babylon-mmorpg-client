import { IWarpMapsMainPanelGUIItemButtonConstructorParams } from '@mmorpg/interfaces/ui/panels/warp-maps-main-panel/IWarpMapsMainPanelGUIItemButton';
import BaseButtonGUIElement from '@mmorpg/ui/base-elements/BaseButtonGUIElement';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';

class WarpMapsMainPanelGUIItemButton extends BaseButtonGUIElement {
	constructor(params: IWarpMapsMainPanelGUIItemButtonConstructorParams) {
		super({
			...params,
			onHoverCursor: MOUSE_CURSORS.POINTER,
		});
	}
}

export default WarpMapsMainPanelGUIItemButton;
