import { IWarpMapsMainPanelGUIItemButtonConstructorParams } from '@mmorpg/interfaces/ui/panels/warp-maps-main-panel/IWarpMapsMainPanelGUIItemButton';
import BaseButtonGUIElement from '@mmorpg/ui/base-elements/BaseButtonGUIElement';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';

class WarpMapsMainPanelGUIItemButton extends BaseButtonGUIElement {
	private _unmetRequirements: boolean = true;

	constructor(params: IWarpMapsMainPanelGUIItemButtonConstructorParams) {
		super({
			...params,
			onHoverCursor: MOUSE_CURSORS.POINTER,
		});
		this._unmetRequirements = params.unmetRequirements;
		this._setColorByUnmetRequirements();
	}

	private _setColorByUnmetRequirements() {
		if (this.enabled && this._unmetRequirements) {
			this.color = '#950000ff';
		}
	}
}

export default WarpMapsMainPanelGUIItemButton;
