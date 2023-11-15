import { describe, it, expect } from 'vitest'
import { IOCContainer } from "../lib/IOCContainer"
import { XSSMiddleware } from "../lib/XSSMiddleware"
import { XSSProtector } from "../lib/XSSProtector"
import { TextPostProcessor} from '../lib/TextPostProcessor'


describe('Test the XSSProtector-Middleware', () => {
    //Check if the encapsulation does work, dependent on xss.checkText, to optimal.
    it("test text correction", () => {
        const xssP = new XSSProtector();
        IOCContainer.instance.registerSingelton('IXSSProtector', xssP);

        const xss = new XSSMiddleware();

        let called = false
        const tpp = new TextPostProcessor();
        tpp.useMiddleware(xss);
        tpp.useMiddleware({postProcess:(context)=>{called = true; return context}})

        expect(xssP.checkText(tpp.postProcess('<script>alert("hello")</script>'))).toBeFalsy();
        expect(xssP.checkText(tpp.postProcess('onClick="someFunction"'))).toBeFalsy();
        expect(called).toBeTruthy()
    })
})