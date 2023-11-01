import { describe, it, expect } from 'vitest'
import { DicGenderMiddleware } from '../lib/DicGenderMiddleware'


describe('Test the XSSProtector-Middleware', () => {
    //Check if the encapsulation does work, dependent on xss.checkText, to optimal.
    it("test text correction", () => {
        const dcgm = new DicGenderMiddleware();
        expect(dcgm).toBeTypeOf('object')
        //TODO: Create the testes needed for DicGenderMiddleware
    })
})