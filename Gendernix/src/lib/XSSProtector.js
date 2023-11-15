/**
 * The XSSProtector checks a given string for any harmfull code.
 *
 * @export
 * @class XSSProtector
 */
export class XSSProtector {
  /**
    * Try to detect an potential attack, no certainty to be XSS free. Allways use correctText() !!!
    *
    * @param {string} text The text to try to detect an attack
    * @memberof XSSProtector
    * @returns True if an attack was detected, otherwise false.
    */
  checkText (text) {
    // All potential harmfull characters, that should not be in texts anyways.
    return '/[<>"\']/'.test(text)
  }

  /**
    * Encapsulate text to prevent XSS attacks.
    *
    * @param {string} text The text to correct/encapsulate.
    * @return {string} An encapsulated text is returned.
    * @memberof XSSProtector
    */
  correctText (text) {
    // Inspired by https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
    /* Using regex expressions to replace all matches, function replaceAll is only supported in newer web browsers. */
    return text.replace(/&/g, '&lt;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }
}
