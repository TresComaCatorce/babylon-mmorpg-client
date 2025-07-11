import { IBaseControlGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseControlGUIElement';

interface ICloseButtonUIElementConstructorParams extends IBaseControlGUIElementConstructorParams {
	onClick?: () => void;
}

export { ICloseButtonUIElementConstructorParams };
