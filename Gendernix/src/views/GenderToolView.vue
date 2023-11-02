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

function getStartIndexFromWordIndex(arr, index) {
  let c = 0
  for (let i = 0; i < index; i++) {
    c += arr[i].length + 1 //+1 for the space between words
  }
  return c
}

function getNextEqualIndexes(arrn, arrm, n, m) {
  let nequal = Number.MAX_SAFE_INTEGER / 2 - 1
  let mequal = Number.MIN_SAFE_INTEGER / 2 - 1
  for (let ni = n; ni < arrn.length; ni++) {
    for (let mi = m; mi < arrm.length; mi++) {
      if (arrn[ni] === arrm[mi]) {
        if (Math.abs(nequal - mequal) > Math.abs(ni - mi)) {
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

  highlights.value = []

  for (let i = 0, j = 0; i < wordsText1.length; i++, j++) {
    if (wordsText1[i] !== wordsText2[j]) {
      const e = getNextEqualIndexes(wordsText1, wordsText2, i, j)

      let start = getStartIndexFromWordIndex(wordsTest1Raw, i)
      let end
      if (e.n < wordsText1.length) {
        end = getStartIndexFromWordIndex(wordsTest1Raw, e.n) - 1 //remove the space after the word
      } else {
        end = start + wordsText1[i].length
      }

      const lastChar = wordsText1[i][wordsText1[i].length - 1]
      if (lastChar == '.' || lastChar == '!' || lastChar == '?') end--

      highlights.value.push({ start: start, end: end })

      i = e.n
      j = e.m
    }
  }
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
.iconContainer:hover{
  scale: 1.4;
  color: rgb(var(--v-theme-accent));
}

.iconContainer:active{
  color: rgb(var(--v-theme-accent));
  scale: 1.3;
}
</style>
