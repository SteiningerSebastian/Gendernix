import { IOCContainer } from "./IOCContainer";

export class XSSMiddleware {
    next = undefined;
    xssProtector = IOCContainer.instance.resolve('IXSSProtector');

    /**
     * Post process the provided text.
     *
     * @param {string} text The text to post process by the middleware.
     * @returns The postProcessed text is returned.
     * @memberof XSSProtector
     */
    postProcess(text) {
        text = this.xssProtector.correctText(text);

        if (this.next != undefined)
            text = this.next.postProcess(text);

        return text;
    }
}