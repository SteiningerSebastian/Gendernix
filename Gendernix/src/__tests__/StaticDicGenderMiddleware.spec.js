import { describe, it, expect } from 'vitest'
import { StaticDictionaryGenderMiddleware } from '../lib/StaticDictionaryGenderMiddleware'
import { TextPostProcessor } from '../lib/TextPostProcessor'

describe('Test the StaticDictionaryGender-Middleware', () => {
    //Check if the encapsulation does work, dependent on xss.checkText, to optimal.
    it("test text correction", () => {
        const dcgm = new StaticDictionaryGenderMiddleware();
        expect(dcgm).toBeTypeOf('object')

        let called = false;
        const tpp = new TextPostProcessor();
        tpp.useMiddleware(dcgm);
        tpp.useMiddleware({ postProcess: (context) => { called = true; return context } })

        expect(tpp.postProcess("Der Nutzer ist groß.")).toBe("Der/die Nutzende ist groß.")
        expect(called).toBeTruthy()
    })
})