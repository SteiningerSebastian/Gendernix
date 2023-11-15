import { describe, it, expect } from 'vitest'
import { TextPostProcessor } from '../lib/TextPostProcessor'

describe('Test the TextPostProcessor', () => {
  it('Register middlewares', () => {
    const tpp = new TextPostProcessor()

    const mid1 = {
      next: undefined,
      postProcess (context) {
        context.text = 'Hello World!'
        if (this.next !== undefined) { context = this.next(context) } return context
      }
    }

    const mid2 = {
      next: undefined,
      postProcess (context) {
        context.text = 'By World!'
        if (this.next !== undefined) { context = this.next(context) } return context
      }
    }

    tpp.useMiddleware(mid1)
    tpp.useMiddleware(mid2)

    expect(tpp.registeredMiddlewares.length).toBe(2)
    expect(mid1.next).toBe(mid2)
  })

  it('Post process', () => {
    const tpp = new TextPostProcessor()

    const mid1 = {
      next: undefined,
      postProcess (context) {
        context.text += ' World'
        if (this.next !== undefined) { context = this.next.postProcess(context) }
        return context
      }
    }

    const mid2 = {
      next: undefined,
      postProcess (context) {
        context.text += '!'
        if (this.next !== undefined) { context = this.next.postProcess(context) }
        return context
      }
    }

    tpp.useMiddleware(mid1)
    tpp.useMiddleware(mid2)

    expect(tpp.postProcess('Hello')).toBe('Hello World!')
  })
})
