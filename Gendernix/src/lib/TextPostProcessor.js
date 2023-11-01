export class TextPostProcessor {

    registeredMiddlewares = [];

    /**
     * PostProcess the given text.
     *
     * @param {*} text The text to post process
     * @returns {string} The post processed text is returned.
     * @memberof TextPostProcessor
     */
    postProcess(text) {
        if (this.registeredMiddlewares.length > 0)
            return this.registeredMiddlewares[0].postProcess(text);
        return text;
    }

    /**
     * Register middleware for the text post processor, expect function postProcess(test:string):string
     *
     * @param {*} middleware
     * @memberof TextPostProcessor
     */
    useMiddleware(middleware) {
        this.registeredMiddlewares.push(middleware);
        if (this.registeredMiddlewares.length > 1)
            this.registeredMiddlewares[this.registeredMiddlewares.length - 2].next = middleware;
    }
}