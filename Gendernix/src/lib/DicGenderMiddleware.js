export class DicGenderMiddleware {
    static dictionary = {
        ' der Nutzer': ' der/die Nutzer*in',
        ' die Nutzer': ' die Nutzer*innen',
        ' der Anwender': ' der/die Anwender*in',
        ' die Anwender': ' die Anwender*innen',
        ' der Benutzer': ' der/die Benutzer*in',
        ' die Benutzer': ' die Benutzer*innen',
        'Autoren': 'Autor*innen',
        'Sehr geehrter ': 'Sehr geehrte '
    }

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

        //Just a very simple implementation.
        for (const [k, v] of Object.entries(DicGenderMiddleware.dictionary)) {
            // console.log(k, v);
            text = text.replace(new RegExp(k, 'g'), v)
        }
        return text;
    }
}