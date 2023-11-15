import dicNouns from "../assets/gender.dic.json"
import { Helpers } from "./helpers";

export class SmartDictionaryGenderMiddleware {
    next = undefined;

    //Inspired by dict.leo.org: Liste der gebräuchlichsten Artikelwörter.
    articles = {
        "der": "der/die",
        "einer": "eine*r",
        "ein": "ein*e",
        "einen": "eine*r",
        "dieser": "diese*r",
        "jener": "jene*r",
        "derjenige": "der-/die-jenige",
        "derselbe": "der-/die-selbe",
        "sein": "sein/ihr",
        "welcher": "welche*r",
        "jeglicher": "jegliche*r",
        "dem": "dem/der",
        "den": "den/die"
    }

    /**
     * Post process the provided text. 
     * Causes context.data.words to become unsync. with context.text!
     *
     * @param {string} context The context for post process by the middleware.
     * @returns The postProcessed text is returned.
     * @memberof XSSProtector
     */
    postProcess(context) {
        if (!('words' in context.data))
            throw new Error('Missing context.data.words!')

        context.text = ''

        //Gender all nouns using the dictionaries.
        for (let w = 0; w < context.data.words.length; w++) {
            //to lower case for all words.
            const word = context.data.words[w].toLowerCase()

            //Check if word is in local dictionary and replace it.
            if ((Helpers.firstLetterUpper(word) + ";False" in dicNouns.wordlist) ||
                Helpers.firstLetterUpper(word) + ";True" in dicNouns.wordlist) {
                let maleArticles = this.getMaleArticlesForNoun(context, w)
                if (Helpers.firstLetterUpper(word) + ";False" in dicNouns.wordlist) {
                    //If the word does not have any articles defined in this.articles, asume it to be plural if a plural version of the word exists.
                    if (Helpers.firstLetterUpper(word) + ";True" in dicNouns.wordlist) {
                        let plural = maleArticles.length == 0;
                        context.data.words[w] = dicNouns.wordlist[Helpers.firstLetterUpper(word) + (plural ? ";True" : ";False")];
                    } else {
                        context.data.words[w] = dicNouns.wordlist[Helpers.firstLetterUpper(word) + ";False"];
                    }
                } else
                    context.data.words[w] = Helpers.matchCasing(dicNouns.wordlist[Helpers.firstLetterUpper(word) + ";True"], context.data.words[w]);

                //Replace all articles that should be gendered and are considered to refer to the noun considered.
                maleArticles.forEach(wb => {
                    context.data.words[wb] = Helpers.matchCasing(this.articles[context.data.words[wb].toLowerCase()], context.data.words[wb])
                });
            }
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
     * Get the articles refering to the noun
     *
     * @param {TPPContext} context
     * @param {number} nounIndex
     * @return {Array<number>} An array containing the indexes of the articles for the noun are returned. 
     * @memberof DicGenderMiddleware
     */
    getMaleArticlesForNoun(context, nounIndex) {
        let liArticleIndexes = []

        //Do it for all words left and right of the noun
        for (let o = -1; o < 2; o += 2) {
            //Loop through the words to check for articles.
            for (let wb = nounIndex + o;
                wb >= 0 &&
                wb < context.data.words.length &&
                context.data.words[wb].indexOf(".") == -1;
                wb += o) {

                //Push the found article into the list to consider.
                if (context.data.words[wb].toLowerCase() in this.articles)
                    liArticleIndexes.push(wb)

                //Assume to have found a noun, remove all articles closer to this noun.
                else if (Helpers.startIsUpper(context.data.words[wb]) && context.data.words[wb].length > 1) {
                    for (let i = 0; i < liArticleIndexes.length; i++) {
                        if (liArticleIndexes[i] * o > (nounIndex + wb) / 2 * o) {
                            //Remove the article, it does not belong to the noun
                            liArticleIndexes.splice(i, 1);
                        }
                    }
                    break;
                }
            }
        }

        return liArticleIndexes
    }
}