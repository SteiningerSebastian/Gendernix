<script setup>
import { IOCContainer } from '../lib/IOCContainer'
import { ref } from 'vue'
import GenderedIcon from '../components/icons/GenderedIcon.vue'
import MaleIcon from '../components/icons/MaleIcon.vue'
import VueHeader from '../components/VueHeader.vue'

const textProvider = ref(IOCContainer.instance.resolve('ITextProvider'))
const textPostProcessor = ref(IOCContainer.instance.resolve('ITextPostProcessor'))
const xssProtector = ref(IOCContainer.instance.resolve('IXSSProtector'))

const gender = ref(true)

//Set the title of the page to the title of the text.
</script>

<template>
  <VueHeader
    :title=" textPostProcessor.postProcess(textProvider.getTitle($route.params.id)) + ' | Gendernix'"
    :description="$t('description.text')"
  />

  <div class="mainContent">
    <v-container style="height: fit-content" class="textContainer">
      <!-- WARNING: ALLWAYS USE {{  }} if processing user generated content, vuejs will encapsulate it automatically! 
          v-html is only used to comply with the assigned Task! It will not encapsulate the string, be aware of XSS !!! 
          More Information: https://vuejs.org/guide/best-practices/security.html#potential-dangers
        -->

      <v-container class="iconTitleContainer">
        <div class="iconBtn" v-if="gender">
          <GenderedIcon @click.stop="gender = !gender" />
        </div>
        <div class="iconBtn" v-if="!gender">
          <MaleIcon @click.stop="gender = !gender" />
        </div>
        <div class="title">
          <h3
            v-html="
              gender
                ? textPostProcessor.postProcess(textProvider.getTitle($route.params.id))
                : xssProtector.correctText(textProvider.getTitle($route.params.id))
            "
          ></h3>
        </div>
      </v-container>

      <div
        class="ms-3"
        v-html="
          gender
            ? textPostProcessor.postProcess(textProvider.getText($route.params.id))
            : xssProtector.correctText(textProvider.getText($route.params.id))
        "
      ></div>
    </v-container>
  </div>
</template>
<style scoped>
.iconBtn {
  cursor: pointer;
  width: fit-content;
  height: 32px;
  width: 32px;
}

.iconBtn:hover {
  scale: 1.1;
}

.iconBtn:active {
  scale: 1;
}

.title {
  width: fit-content;
  float: auto;
}

.title h3 {
  padding: 0;
  margin: 0;
  margin-inline-start: 0.75em;
}

.iconTitleContainer {
  display: flex;
  width: 100%;
}

.textContainer {
  margin-top: 6em;
}

@media only screen and (max-width: 1280px) {
  .textContainer {
    margin-top: 0em;
  }
}

/* Ensure that the printed version of the manual is readable. */
@media print {
  .mainContent {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 110vh;
    margin: 0;
    padding: 0;
    z-index: 10000 !important;
    background-color: white;
    transform: translateY(-5em);
    color: black !important;
  }

  .iconBtn {
    display: none;
  }

  .title h3 {
    padding: 0;
    margin: 0;
  }
}
</style>

<style></style>
