import { describe, it, expect } from 'vitest'
import { HTMLConversionMiddleware } from '../lib/HTMLConversionMiddleware'
import { TextPostProcessor } from '../lib/TextPostProcessor'

describe('Test the HTMLConversionMiddleware', () => {
    //Check if the encapsulation does work, dependent on xss.checkText, to optimal.
    it("test text html conversion", () => {
        const m = new HTMLConversionMiddleware();
        expect(m).toBeTypeOf('object')

        let called = false;
        const tpp = new TextPostProcessor();
        tpp.useMiddleware(m);
        tpp.useMiddleware({ postProcess: (context) => { called = true; return context } })

        expect(tpp.postProcess("Der Nutzer ist groß.\nUnd nett.")).toBe("<p>Der Nutzer ist groß.</p><p>Und nett.</p>")
        expect(called).toBeTruthy()
    })
})