import { describe, it, expect } from 'vitest'
import { SmartDictionaryGenderMiddleware } from '../lib/SmartDictionaryGenderMiddleware'
import { TextPostProcessor } from '../lib/TextPostProcessor'
import {SplittingMiddleware} from '../lib/SplittingMiddleware'; 

describe('Test the SmartDictionaryGender-Middleware', () => {
    //Check if the encapsulation does work, dependent on xss.checkText, to optimal.
    it("test text correction", () => {
        const dcgm = new SmartDictionaryGenderMiddleware();
        expect(dcgm).toBeTypeOf('object')

        let called = false;
        const tpp = new TextPostProcessor();
        tpp.useMiddleware(new SplittingMiddleware())
        tpp.useMiddleware(dcgm);
        tpp.useMiddleware({ postProcess: (context) => { called = true; return context } })

        expect(tpp.postProcess("Der Nutzer ist groß.")).toBe("Der/die Nutzer*in ist groß.")
        expect(tpp.postProcess("Die Nutzer ist groß.")).toBe("Die Nutzer*innen ist groß.")
        expect(called).toBeTruthy()
    })
})