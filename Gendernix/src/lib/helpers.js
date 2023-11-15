export class Helpers {
    /**
     * Match the casing of the first letter.
     *
     * @param {string} str The string to transform.
     * @param {string} match The match to base the transform on.
     * @return {string} The transformed string is returned. 
     * @memberof DicGenderMiddleware
     */
    static matchCasing(str, match) {
        return (match[0] === match[0].toUpperCase() ? str[0].toUpperCase() : str[0].toLowerCase()) + str.substring(1)
    }

    /**
     * Make the first letter of the string uppercase.
     *
     * @param {string} str The string to transform.
     * @return {string} Returns the transforemed string.
     * @memberof DicGenderMiddleware
     */
    static firstLetterUpper(str) {
        return str[0].toUpperCase() + str.substring(1)
    }

    /**
     * Check if the first char is upper.
     *
     * @param {string} word The word to check
     * @return {bool} True if the first char is upper.
     * @memberof DicGenderMiddleware
     */
    static startIsUpper(word) {
        return word[0] === word[0].toUpperCase()
    }
}