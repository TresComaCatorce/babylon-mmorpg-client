import { IBaseControlUIElementConstructorParams } from '@mmorpg/interfaces/ui/base-elements/IBaseControlUIElement';
import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';

interface IBaseButtonGUIElementConstructorParams extends IBaseControlUIElementConstructorParams {
	buttonText?: string;
	onHoverCursor?: MOUSE_CURSORS;
	onClick?: () => void;
}

export { IBaseButtonGUIElementConstructorParams };
