import { describe, it, expect } from 'vitest'
import { IOCContainer } from "../lib/IOCContainer"
import { XSSMiddleware } from "../lib/XSSMiddleware"
import { XSSProtector } from "../lib/XSSProtector"


describe('Test the XSSProtector-Middleware', () => {
    //Check if the encapsulation does work, dependent on xss.checkText, to optimal.
    it("test text correction", () => {
        const xssP = new XSSProtector();
        IOCContainer.instance.registerSingelton('IXSSProtector', xssP);

        const xss = new XSSMiddleware();
        expect(xssP.checkText(xss.postProcess('<script>alert("hello")</script>'))).toBeFalsy();
        expect(xssP.checkText(xss.postProcess('onClick="someFunction"'))).toBeFalsy();
    })
})