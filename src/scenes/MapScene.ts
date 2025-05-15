import { AppendSceneAsync } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

import BaseScene from './BaseScene';

/**
 * @class MapScene
 * @description Abstract scene class for map-related logic, providing a utility method to load map assets into the scene.
 * @abstract
 * @extends BaseScene
 */
abstract class MapScene extends BaseScene {
	/**
	 * @description Constructs a new MapScene and initializes the base scene.
	 * @access public
	 */
	constructor() {
		super();
	}

	/**
	 * @description Loads map assets from the specified path into the scene using Babylon.js's AppendSceneAsync.
	 * @access protected
	 * @param {string} path - The path to the map asset or scene file to load.
	 * @returns {void}
	 */
	protected loadMapAssets(path: string): void {
		AppendSceneAsync(path, this);
	}
}

export default MapScene;
