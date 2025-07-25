import { IBaseControlGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseControlGUIElement';

interface IWarpMapsMainPanelGUIItemButtonConstructorParams extends IBaseControlGUIElementConstructorParams {
	buttonText: string;
	toolTipText?: string;
	enabled: boolean;
	unmetRequirements: boolean;
	onClick: () => void;
}

export { IWarpMapsMainPanelGUIItemButtonConstructorParams };
