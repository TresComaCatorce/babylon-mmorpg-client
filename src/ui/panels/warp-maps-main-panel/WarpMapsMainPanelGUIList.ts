import BaseScrollableVerticalListGUIElement from '@mmorpg/ui/base-elements/base-scrollable-vertical-list-GUI-element/BaseScrollableVerticalListGUIElement';
import WarpMapsMainPanelGUIItemButton from '@mmorpg/ui/panels/warp-maps-main-panel/WarpMapsMainPanelGUIItemButton';
import GUI_ELEMENT_NAMES from '@mmorpg/utils/constants/GUI_ELEMENT_NAMES';

class WarpMapsMainPanelGUIList extends BaseScrollableVerticalListGUIElement {
	constructor() {
		super({ elementName: `${GUI_ELEMENT_NAMES.WARP_MAPS_PANEL}${GUI_ELEMENT_NAMES.LIST}` });
	}

	public addMapToList(itemToAdd: WarpMapsMainPanelGUIItemButton) {
		this._addItem(itemToAdd);
	}
}

export default WarpMapsMainPanelGUIList;
