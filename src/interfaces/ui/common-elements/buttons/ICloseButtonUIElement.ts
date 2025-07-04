import { IBaseControlUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseControlUIElement';

interface ICloseButtonUIElementConstructorParams extends IBaseControlUIElementConstructorParams {
	onClick?: () => void;
}

export { ICloseButtonUIElementConstructorParams };
