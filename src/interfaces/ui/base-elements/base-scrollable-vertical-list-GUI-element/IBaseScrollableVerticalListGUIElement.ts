import { IBaseScrollViewerGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseScrollViewerGUIElement';

type IBaseScrollableVerticalListGUIElementConstructorParams = IBaseScrollViewerGUIElementConstructorParams;

interface ListItemConfig {
	label: string;
	onClick: () => void;
}

export { IBaseScrollableVerticalListGUIElementConstructorParams, ListItemConfig };
