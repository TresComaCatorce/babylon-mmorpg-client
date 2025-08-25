/**
 * @class BaseFactory
 * @description Abstract base class for factories, providing initialization and disposal contract for subclasses.
 * @abstract
 */
abstract class BaseFactory {
	/**
	 * @description Constructs a new BaseFactory and calls the initialization method.
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

export default BaseFactory;
