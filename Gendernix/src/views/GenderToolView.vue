<script setup>
import { ref } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import TextInput from '../components/TextInput.vue'
import { IOCContainer } from '../lib/IOCContainer'
import { watch } from 'vue'
import CopyIcon from '../components/icons/CopyIcon.vue'

const text = ref('')
const input = ref('')
const highlights = ref([]) //Array of highlights [{start: number, end: number }]

const textPostProcessor = ref(IOCContainer.instance.resolve('ITextPostProcessor'))
const xssProtector = ref(IOCContainer.instance.resolve('IXSSProtector'))

watch(input, () => {
  highlights.value = []
})

//Get the index of an array where the elements are equal, closest from the start position.
function getNextEqualIndexes(arrn, arrm, n, m) {
  let nequal = Number.MAX_SAFE_INTEGER
  let mequal = Number.MAX_SAFE_INTEGER
  //Go through the array and search from the start position for the next equal words.
  //Stop the loop if no more indexes to check or all checked indexes would be larger than what was already found.
  for (let ni = n; ni < arrn.length && ni - n < nequal - n + mequal - m; ni++) {
    //&& (ni - n) < (nequal - n);
    for (
      let mi = m;
      //Stop the loop if no more indexes to check or all checked indexes would be larger than what was already found.
      mi < arrm.length && ni - n + mi - m < nequal - n + mequal - m;
      mi++
    ) {
      if (arrn[ni] === arrm[mi]) {
        //Found a equal word that is closer to the start position than the current found equal word.
        if (nequal - n + mequal - m > ni - n + mi - m) {
          nequal = ni
          mequal = mi
        }
      }
    }
  }

  return { m: mequal, n: nequal }
}

function compareAndHighlightDifference(text1, text1Raw, text2) {
  const wordsText1 = text1.split(' ')
  const wordsText2 = text2.split(' ')
  const wordsTest1Raw = text1Raw.split(' ')

  const setPunctuationmarks = new Set(['!', '?', '.', ','])

  highlights.value = []

  /*Go through all words and find where the second text differs from the first text.  
  Highlight those differences and continue to search for other differences.*/
  for (let i = 0, j = 0, start = 0; i < wordsText1.length; i++, j++) {
    const iStart = i
    if (wordsText1[i] !== wordsText2[j]) {
      const e = getNextEqualIndexes(wordsText1, wordsText2, i, j)

      console.log(e, wordsTest1Raw[e.n], wordsTest1Raw[e.m])

      //Add to the end indexes.
      let end = start - 1
      for (let iEnd = i; iEnd < e.n && e.n < wordsTest1Raw.length; iEnd++) {
        end += wordsTest1Raw[iEnd].length + 1
      }

      //Exclude ./!/? from the highlighted text.
      const lastChar = wordsText1[i][wordsText1[i].length - 1]
      if (setPunctuationmarks.has(lastChar)) end--

      highlights.value.push({ start: start, end: end })

      //Continue the search from the new equal position
      i = e.n
      j = e.m
    }

    //Add to the start index.
    for (let c = iStart; c <= i && i < wordsTest1Raw.length; c++) {
      start += wordsTest1Raw[c].length + 1
    }
  }
  console.log(highlights.value)
}

//Inspired by https://bobbyhadz.com/blog/navigator-clipboard-is-undefined-in-javascript
function copyTextToClipboard() {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text.value)
  } else {
    const textarea = document.createElement('textarea')
    textarea.value = text.value

    textarea.style.position = 'absolute'
    textarea.style.left = '-99999999px'

    document.body.prepend(textarea)
    textarea.select()

    try {
      document.execCommand('copy')
    } catch (err) {
      console.log(err)
    } finally {
      textarea.remove()
    }
  }
}
</script>

<template>
  <div class="mainContent mt-9">
    <v-container>
      <section>
        <div class="mb-8"><SectionHeader :heading="$t('gendertool.heading')" /></div>
        <TextInput v-model="input" v-bind:highlights="highlights" />
        <v-btn
          @click="
            () => {
              text = textPostProcessor.postProcess(input)
              compareAndHighlightDifference(xssProtector.correctText(input), input, text)
            }
          "
          rounded="0"
          >{{ $t('gendertool.btnGender.text') }}</v-btn
        >
        <div class="resultHeading">
          <div class="headingText">
            <h2>{{ $t('gendertool.result') }}</h2>
          </div>
          <div class="iconContainer" @click.stop="copyTextToClipboard">
            <CopyIcon />
          </div>
        </div>

        <!-- WARNING: ALLWAYS USE {{  }} if processing user generated content, vuejs will encapsulate it automatically! 
          v-html is only used to comply with the assigned Task! It will not encapsulate the string, be aware of XSS !!! 
          More Information: https://vuejs.org/guide/best-practices/security.html#potential-dangers
        -->
        <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
        <v-container ref="resultingText" v-html="text"> </v-container>
      </section>
    </v-container>
  </div>
</template>
<style scoped>
h2 {
  width: fit-content;
  margin: 0;
  padding: 0;
}
.resultHeading {
  display: flex;
  height: fit-content;
  margin: 0;
  padding: 0;
  margin-top: 3em;
  margin-bottom: 3em;
  width: 100%;
}
.headingText {
  width: fit-content;
  margin: 0;
  padding: 0;
  height: fit-content;
}

.iconContainer {
  margin: 0;
  padding: 0;
  float: inline-start;
  margin-inline-start: 1em;
  height: fit-content;
  justify-content: center;
  margin-top: 1em;
  scale: 1.3;
  cursor: pointer;
}
.iconContainer:hover {
  scale: 1.4;
  color: rgb(var(--v-theme-accent));
}

.iconContainer:active {
  color: rgb(var(--v-theme-accent));
  scale: 1.3;
}
</style>
