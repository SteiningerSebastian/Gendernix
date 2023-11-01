import { describe, it, expect } from 'vitest'
import { TextPostProcessor } from '../lib/TextPostProcessor'

describe('Test the TextPostProcessor', () => {
    it('Register middlewares', () => {
        const tpp = new TextPostProcessor();

        const mid1 = {
            next: undefined, postProcess(text) {
                text = "Hello World!";
                if (this.next != undefined) { text = this.next(text) } return text;
            }
        }

        const mid2 = {
            next: undefined, postProcess(text) {
                text = "By World!";
                if (this.next != undefined) { text = this.next(text) } return text;
            }
        }

        tpp.useMiddleware(mid1)
        tpp.useMiddleware(mid2)

        expect(tpp.registeredMiddlewares.length).toBe(2);
        expect(mid1.next).toBe(mid2);
    })

    it('Post process', () => {
        const tpp = new TextPostProcessor();

        const mid1 = {
            next: undefined, 
            postProcess(text) {
                text += " World";
                if (this.next != undefined) { text = this.next.postProcess(text) }
                return text;
            }
        }

        const mid2 = {
            next: undefined, 
            postProcess(text) {
                text += "!";
                if (this.next != undefined) { text = this.next.postProcess(text) }
                return text;
            }
        }

        tpp.useMiddleware(mid1)
        tpp.useMiddleware(mid2)

        expect(tpp.postProcess("Hello")).toBe("Hello World!");
    })
})