<script setup>
import { ref } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import TextInput from '../components/TextInput.vue'
import { IOCContainer } from '../lib/IOCContainer'

const text = ref('')
const input = ref('')

const textPostProcessor = ref(IOCContainer.instance.resolve('ITextPostProcessor'))
</script>

<template>
  <div class="mainContent mt-9">
    <v-container>
      <section>
        <div class="mb-8"><SectionHeader :heading="$t('gendertool.heading')" /></div>
        <TextInput v-model="input" />
        <v-btn
          @click="
            () => {
              text = input
            }
          "
          rounded="0"
          >{{ $t('gendertool.btnGender.text') }}</v-btn
        >
        <h2>{{ $t('gendertool.result') }}</h2>

        <!-- WARNING: ALLWAYS USE {{  }} if processing user generated content, vuejs will encapsulate it automatically! 
          v-html is only used to comply with the assigned Task! It will not encapsulate the string, be aware of XSS !!! 
          More Information: https://vuejs.org/guide/best-practices/security.html#potential-dangers
        -->
        <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
        <v-container v-html="textPostProcessor.postProcess(text)">
        </v-container>


      </section>
    </v-container>
  </div>
</template>
