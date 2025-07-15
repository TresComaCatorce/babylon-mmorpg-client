import { IBaseControlGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseControlGUIElement';

interface IWarpMapsMainPanelGUIItemButtonConstructorParams extends IBaseControlGUIElementConstructorParams {
	buttonText: string;
	onClick: () => void;
}

export { IWarpMapsMainPanelGUIItemButtonConstructorParams };
