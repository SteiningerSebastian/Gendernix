import dicNouns from "../assets/gender.dic.json"

export class DicGenderMiddleware {
    //Replacement dictionary
    dictionary = {
        "geehrter": "geehrte*r",
        "jeder": "jede*r",
        "lieber": "liebe*r",
        "seine": "seine/ihre",
        "seinem": "seinem/ihrem",
        "er": "er/sie"
    }

    //Inspired by dict.leo.org: Liste der gebräuchlichsten Artikelwörter.
    articles = {
        "der": "der/die",
        "einer": "eine*r",
        "ein": "ein*e",
        "dieser": "diese*r",
        "jener": "jene*r",
        "derjenige": "der-/die-jenige",
        "derselbe": "der-/die-selbe",
        "sein": "sein/ihr",
        "welcher": "welche*r",
        "jeglicher": "jegliche*r",
        "dem":"dem/der"
    }

    /**
     * Post process the provided text.
     *
     * @param {string} context The context for post process by the middleware.
     * @returns The postProcessed text is returned.
     * @memberof XSSProtector
     */
    postProcess(context) {
        if (!('words' in context.data))
            throw new Error('Missing SplittingMiddleware!')

        context.text = ''

        //Gender all nouns using the dictionaries.
        for (let w = 0; w < context.data.words.length; w++) {
            //to lower case for all words.
            const word = context.data.words[w].toLowerCase()

            //Check if word is in local dictionary and replace it.
            if (word in this.dictionary)
                context.data.words[w] = this.matchCasing(this.dictionary[word],context.data.words[w]);
            else if (this.firstLetterUpper(word) + ";False" in dicNouns.wordlist) {
                //Check if plural by article, not most reliable but best I can do.
                if (this.firstLetterUpper(word) + ";True" in dicNouns.wordlist) {
                    let plural = true;
                    /* Loop until the beginning or the end of the sentence or the next noun (UpperCase)
                     * This is done to check if the word is plural (find article) and replace the article if needed.
                    */
                    for (let wb = w-1;
                        wb >= 0 &&
                        context.data.words[wb].indexOf(".") == -1 &&
                        plural;
                        wb--) {
                        plural = !(context.data.words[wb].toLowerCase() in this.articles);
                        if(!plural){
                            context.data.words[wb] = this.matchCasing(this.articles[context.data.words[wb].toLowerCase()], context.data.words[wb])
                        }
                    }
                    context.data.words[w] = dicNouns.wordlist[this.firstLetterUpper(word) + (plural?";True":";False")];
                } else{
                    context.data.words[w] = dicNouns.wordlist[this.firstLetterUpper(word) + ";False"];

                    /* Find the article to replace. 
                     * Only consider articles in front of a word (nearest) example: "Der Nutzer der" the first "der" would be considered the 
                     * second one would be ignored. This is done to prevent errors like "Der Nutzer, der Automat ist fehlerhaft, benutzt den Automaten.*/
                    for (let wb = w-1;
                        wb >= 0 &&
                        context.data.words[wb].indexOf(".") == -1;
                        wb--) {
                        if(context.data.words[wb].toLowerCase() in this.articles){
                            context.data.words[wb] = this.matchCasing(this.articles[context.data.words[wb].toLowerCase()], context.data.words[wb])
                            break;
                        }
                    }
                }
            } else if (this.firstLetterUpper(word) + ";True" in dicNouns.wordlist)
                context.data.words[w] = this.matchCasing(dicNouns.wordlist[this.firstLetterUpper(word) + ";True"], context.data.words[w]);
        }

        //Build text from words.
        for (let w = 0; w < context.data.words.length; w++) {
            context.text += context.data.words[w];
        }

        //Call the next middleware if one is defined
        if (this.next != undefined)
            context = this.next.postProcess(context);

        return context;
    }

    /**
     * Make the first letter of the string uppercase.
     *
     * @param {string} str The string to transform.
     * @return {string} Returns the transforemed string.
     * @memberof DicGenderMiddleware
     */
    firstLetterUpper(str){
        return str[0].toUpperCase() + str.substring(1)
    }

    /**
     * Match the casing of the first letter.
     *
     * @param {string} str The string to transform.
     * @param {string} match The match to base the transform on.
     * @return {string} The transformed string is returned. 
     * @memberof DicGenderMiddleware
     */
    matchCasing(str, match){
        return (match[0] == match[0].toUpperCase() ? str[0].toUpperCase():str[0].toLowerCase()) + str.substring(1)
    }
}