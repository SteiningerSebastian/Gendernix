import { IOCContainer } from './IOCContainer'

export class XSSMiddleware {
  next = undefined
  xssProtector = IOCContainer.instance.resolve('IXSSProtector')

  /**
    * Post process the provided text.
    *
    * @param {string} context The context for post process by the middleware.
    * @returns The postProcessed text is returned.
    * @memberof XSSProtector
    */
  postProcess (context) {
    context.text = this.xssProtector.correctText(context.text)

    if (this.next !== undefined) { context = this.next.postProcess(context) }

    return context
  }
}
