<script setup>
import { IOCContainer } from '../lib/IOCContainer'
import { ref } from 'vue'

const textProvider = ref(IOCContainer.instance.resolve('ITextProvider'))
const textPostProcessor = ref(IOCContainer.instance.resolve('ITextPostProcessor'))
</script>

<template>
  <div class="mainContent">
    <v-container class="" style="height: fit-content;">

      <!-- WARNING: ALLWAYS USE {{  }} if processing user generated content, vuejs will encapsulate it automatically! 
          v-html is only used to comply with the assigned Task! It will not encapsulate the string, be aware of XSS !!! 
          More Information: https://vuejs.org/guide/best-practices/security.html#potential-dangers
        -->
      <h3 v-html="textPostProcessor.postProcess(textProvider.getTitle($route.params.id))"></h3>
      <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
      <v-container v-html="textPostProcessor.postProcess(textProvider.getText($route.params.id))">
      </v-container>
      
    </v-container>
  </div>
</template>
