export class IOCContainer {
  static instance = new IOCContainer()

  objects = {}

  /**
    * Register a new singelton object.
    *
    * @param {string} id The id or interface to resolve.
    * @param {object} object The object to register.
    * @memberof IOCContainer
    */
  registerSingelton (id, object) {
    this.objects[id] = object
  }

  /**
    * Register a transient type for IOC.
    *
    * @param {string} id The id or interface to resolve.
    * @param {()=>object} construct The construct to create an instance of the object.
    * @memberof IOCContainer
    */
  registerTransient (id, construct) {
    if (typeof construct !== 'function') { throw new Error('Unable to create object, invalid construct!') }
    this.objects[id] = construct
  }

  /**
    * Resolve an id or interface to a object.
    *
    * @param {string} id The id or interface to resolve.
    * @return {object} An instance of an registered object is retuned.
    * @memberof IOCContainer
    */
  resolve (id) {
    if (typeof this.objects[id] === 'function') { return this.objects[id]() }
    return this.objects[id]
  }
}
