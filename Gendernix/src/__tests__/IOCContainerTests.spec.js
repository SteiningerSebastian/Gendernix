import { IOCContainer } from "../lib/IOCContainer";
import { describe, it, expect } from 'vitest'


describe("IOCContainer", () => {
    //Check if the IOCs singelton instance is working correctly
    it('check singelton implementation', () => {
        expect(IOCContainer.instance).toBe(IOCContainer.instance)
        expect(IOCContainer.instance == null).toBeFalsy()
    })

    //check if singeltons can be registered and resolved.
    it('check register and resolve singelton', () => {
        const obj = { hello: 'world' };
        IOCContainer.instance.registerSingelton("testSingelton", obj)
        expect(IOCContainer.instance.resolve('testSingelton').hello).toBe(obj.hello)
        obj.hello = " world!"
        expect(IOCContainer.instance.resolve('testSingelton').hello).toBe(' world!')
    })

    //Check if transients can be registered and resolved
    it('check register and resolve transient', () => {
        let i = 0;
        IOCContainer.instance.registerSingelton("testTransient", () => { return { id: (() => { i++; return i; })() } })
        expect(IOCContainer.instance.resolve('testTransient').id != IOCContainer.instance.resolve('testTransient').id).toBe(true)
        const obj = IOCContainer.instance.resolve('testTransient');
        obj.id = 100;
        expect(IOCContainer.instance.resolve('testTransient').id).toBe(4)
        const obj1 = IOCContainer.instance.resolve('testTransient');
        obj1.id = 101;
        expect(obj.id==obj1.id).toBeFalsy()
    })
})