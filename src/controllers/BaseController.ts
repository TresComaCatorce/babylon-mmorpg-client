/**
 * @class BaseController
 * @description Abstract base class for controllers, providing initialization and disposal contract for subclasses.
 * @abstract
 */
abstract class BaseController {
	/**
	 * @description Constructs a new BaseController and calls the initialization method.
	 * @access public
	 */
	constructor() {}

	/**
	 * @description Abstract method for disposing of controller resources. Must be implemented by subclasses.
	 * @access public
	 * @abstract
	 * @returns {void}
	 */
	public abstract dispose(): void;
}

export default BaseController;
