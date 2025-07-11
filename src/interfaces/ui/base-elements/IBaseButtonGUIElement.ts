import { IBaseControlGUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseControlGUIElement';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';

interface IBaseButtonGUIElementConstructorParams extends IBaseControlGUIElementConstructorParams {
	buttonText?: string;
	onHoverCursor?: MOUSE_CURSORS;
	onClick?: () => void;
}

export { IBaseButtonGUIElementConstructorParams };
