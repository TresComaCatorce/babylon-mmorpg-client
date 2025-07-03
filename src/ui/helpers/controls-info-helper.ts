import { Rectangle, TextBlock, Button, Control, Container } from '@babylonjs/gui';

import MOUSE_CURSORS from '@mmorpg/utils/constants/MOUSE_CURSORS';

const createControlsInfoHelper = () => {
	const infoBox = new Rectangle('InfoBox');
	infoBox.widthInPixels = 270;
	infoBox.heightInPixels = 190;
	infoBox.cornerRadius = 10;
	infoBox.color = 'white';
	infoBox.thickness = 1;
	infoBox.background = '#000000AA';
	infoBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	infoBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
	infoBox.paddingTopInPixels = 5;
	infoBox.paddingLeftInPixels = 5;

	const stackPanel = new Container('Panel');

	const titleContainer = new Container('TitleContainer');

	const titleText = new TextBlock('Titulo');
	titleText.text = 'Controls';
	titleText.fontSize = 18;
	titleText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
	titleText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
	titleText.paddingTopInPixels = 8;

	const closeButton = Button.CreateSimpleButton('close', '✕');
	closeButton.width = '30px';
	closeButton.height = '30px';
	closeButton.color = 'white';
	closeButton.background = '#AA0000';
	closeButton.cornerRadius = 5;
	closeButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
	closeButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
	closeButton.paddingTop = '5px';
	closeButton.paddingRight = '5px';
	closeButton.onPointerUpObservable.add(() => {
		infoBox.isVisible = false;
	});
	closeButton.isHitTestVisible = true;
	closeButton.onPointerEnterObservable.add(() => {
		document.body.style.cursor = MOUSE_CURSORS.POINTER;
	});
	closeButton.onPointerOutObservable.add(() => {
		document.body.style.cursor = MOUSE_CURSORS.DEFAULT;
	});

	const textContainer = new Container('TextContainer');
	const infoText = new TextBlock('Texto');
	infoText.text =
		'\n• [W-A-S-D] Movement\n• [Hold mouse left-click] Rotate camera\n• [Mouse scroll] Zoom\n• [Shift] Run\n• [Caps Lock] Run lock/unlock\n• [G] Glow \n• [1-5] Equip/remove armor\n • [-] Decrease HP\n • [+] Add HP';
	infoText.color = 'white';
	infoText.fontSize = 13;
	infoText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	infoText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
	infoText.paddingLeftInPixels = 10;
	infoText.paddingTopInPixels = 10;
	infoText.textWrapping = true;

	titleContainer.addControl(titleText);
	textContainer.addControl(infoText);
	stackPanel.addControl(textContainer);
	infoBox.addControl(stackPanel);
	titleContainer.addControl(closeButton);
	stackPanel.addControl(titleContainer);

	return infoBox;
};

export { createControlsInfoHelper };
