import { IBasePanelGUIConstructorParams } from '@mmorpg/interfaces/ui/panels/IBasePanelGUI';

interface IBaseMainPanelGUIConstructorParams extends IBasePanelGUIConstructorParams {
	closePanel?: () => void;
}

export { IBaseMainPanelGUIConstructorParams };
