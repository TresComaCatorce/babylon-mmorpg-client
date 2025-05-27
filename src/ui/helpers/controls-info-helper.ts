import { Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture, Rectangle, TextBlock, Button, Control, Container } from '@babylonjs/gui';

const createControlsInfoHelper = (scene: Scene) => {
	const guiTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);

	const infoBox = new Rectangle('InfoBox');
	infoBox.widthInPixels = 270;
	infoBox.heightInPixels = 140;
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
		document.body.style.cursor = 'pointer';
	});
	closeButton.onPointerOutObservable.add(() => {
		document.body.style.cursor = 'default';
	});

	const textContainer = new Container('TextContainer');
	const infoText = new TextBlock('Texto');
	infoText.text =
		'\n• Movement: W-A-S-D\n• Rotate camera: Hold mouse left-click\n• Zoom: Mouse scroll\n• Run: Shift\n• Run lock/unlock: Caps Lock\n• Glow: G';
	infoText.color = 'white';
	infoText.fontSize = 13;
	infoText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
	infoText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
	infoText.paddingLeftInPixels = 10;
	infoText.paddingTopInPixels = 10;
	infoText.textWrapping = true;

	titleContainer.addControl(titleText);
	titleContainer.addControl(closeButton);
	stackPanel.addControl(titleContainer);
	textContainer.addControl(infoText);
	stackPanel.addControl(textContainer);
	infoBox.addControl(stackPanel);
	guiTexture.addControl(infoBox);

	return infoBox;
};

export { createControlsInfoHelper };
