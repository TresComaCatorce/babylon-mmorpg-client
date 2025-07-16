import { IBaseControlGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseControlGUIElement';

interface ICloseButtonGUIElementConstructorParams extends IBaseControlGUIElementConstructorParams {
	onClick?: () => void;
}

export { ICloseButtonGUIElementConstructorParams };
