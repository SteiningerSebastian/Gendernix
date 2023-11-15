export class SplittingMiddleware {
  /**
    * Post process the provided text.
    *
    * @param {string} context The context for post process by the middleware.
    * @returns The postProcessed text is returned.
    * @memberof XSSProtector
    */
  postProcess (context) {
    const text = context.text
    const split = /[ ,.!?]|(&lt;)|(&quot;)|(&gt;)|(&#039;)/

    let word = ''
    const liWords = []
    // Split the text in words and special characters as defined by the regExp.
    for (let c = 0; c < text.length; c++) {
      word += text[c]
      if (split.test(word)) {
        liWords.push(word)
        word = ''
      } else if (split.test(text[c + 1]) ||
                (text[c + 1] === '&' && split.test(text.substring(c + 1, c + 7)))) {
        liWords.push(word)
        word = ''
      }
    }

    // If the text is only one word push the text into the list of words.
    if (liWords.length === 0) { liWords.push(text) }

    context.data.words = liWords

    if (this.next !== undefined) { context = this.next.postProcess(context) }

    return context
  }
}
