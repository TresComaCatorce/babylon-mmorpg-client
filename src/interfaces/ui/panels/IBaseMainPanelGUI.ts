import { IBasePanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/IBasePanelGUI';

interface IBaseMainPanelGUIConstructorParams extends IBasePanelGUIConstructorParams {
	title?: string;
	closePanel?: () => void;
}

export { IBaseMainPanelGUIConstructorParams };
