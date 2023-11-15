import { describe, it, expect } from 'vitest'
import { XSSProtector } from '../lib/XSSProtector'

describe('Test the XSSProtector', () => {
  // Test if potential xss attacks are detected.
  it('test detection', () => {
    const xss = new XSSProtector()
    expect(xss.checkText('<script>alert("hello")</script>')).toBeTruthy()
    expect(xss.checkText('This is a Test with some text & my name is sebastian')).toBeFalsy()
    expect(xss.checkText('onClick="()=>{alert("hello")}"')).toBeTruthy()
  })

  // Check if the encapsulation does work, dependent on xss.checkText, to optimal.
  it('test text correction', () => {
    const xss = new XSSProtector()
    expect(xss.checkText(xss.correctText('<script>alert("hello")</script>'))).toBeFalsy()
    expect(xss.checkText(xss.correctText('onClick="someFunction"'))).toBeFalsy()
  })
})
