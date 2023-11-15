import { Helpers } from './helpers'

export class StaticDictionaryGenderMiddleware {
  next = undefined

  // Static Replacement dictionary, list of words to replace.
  dictionary = {
    geehrter: 'geehrte*r',
    jeder: 'jede*r',
    lieber: 'liebe*r',
    'man hat seine': 'wir haben unsere',
    'man hat': 'wir haben',
    sein: 'sein/ihr',
    seine: 'seine/ihre',
    seinem: 'seinem/ihrem',
    er: 'er/sie',
    studenten: 'Studierenden',
    'der Lehrer': 'die lehrende Person',
    'die Lehrer': 'die Lehrenden',
    'den Betroffenen': 'die Betroffene Person',
    'der Stimmberechtigte': 'das stimmberechtigte Mitglied',
    'der Leser': 'der/die Lesende',
    'die Studentin oder der Student': 'die Studierenden',
    'der Nutzer': 'der/die Nutzende'
    // ...
  }

  /**
    * Post process the provided text.
    * Causes context.data.words to become unsync. with context.text!
    *
    * @param {string} context The context for post process by the middleware.
    * @returns The postProcessed text is returned.
    * @memberof XSSProtector
    */
  postProcess (context) {
    Object.keys(this.dictionary).forEach(key => {
      context.text = context.text.replace(new RegExp('( ' + key + ' )|(' + key + ' )|( ' + key + ',)|( ' + key + '\\.)|( ' + key + '\\!)|( ' + key + '\\?)', 'gi'), (match) => {
        if (match[0] === ' ') { return ' ' + Helpers.matchCasing(this.dictionary[key], match.substring(1)) + ' ' }

        // The start of the text.
        else if (Helpers.startIsUpper(match)) { return Helpers.matchCasing(this.dictionary[key], match) + ' ' } else return match
      })
    })

    // Call the next middleware if one is defined
    if (this.next !== undefined) { context = this.next.postProcess(context) }

    return context
  }
}
