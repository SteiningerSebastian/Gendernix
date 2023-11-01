export class DicGenderMiddleware {
    dictionary = {}

    /**
     * Post process the provided text.
     *
     * @param {string} text The text to post process by the middleware.
     * @returns The postProcessed text is returned.
     * @memberof XSSProtector
     */
    postProcess(text) {
        if (this.next != undefined)
            text = this.next.postProcess(text);
        
        //TODO: DO SOME WORK

        return text;
    }
}