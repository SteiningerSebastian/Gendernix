export class HTMLConversionMiddleware {
    /**
    * Post process the provided text.
    *
    * @param {string} context The context for post process by the middleware.
    * @returns The postProcessed text is returned.
    * @memberof XSSProtector
    */
    postProcess(context) {
        const html = context.text.replace(new RegExp('\\n', 'g'), '</p><p>')
        if (html !== context.text)
            context.text = '<p>' + html + '</p>'

        if (this.next != undefined)
            context = this.next.postProcess(context);

        return context;
    }
} 