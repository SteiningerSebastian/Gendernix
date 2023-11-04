<script setup>
import { IOCContainer } from '../lib/IOCContainer'
import SearchBar from '../components/SearchBar.vue'
import VueHeader from '../components/VueHeader.vue'
import { ref } from 'vue'

const textProvider = ref(IOCContainer.instance.resolve('ITextProvider'))
const textPostProcessor = ref(IOCContainer.instance.resolve('ITextPostProcessor'))

const items = ref()
items.value = textProvider.value.textIds

const displayTextLength = 256

const searchTerm = ref('')
const searchFast = ref()

//update handing for search button searches in all text and title
function updateSearch() {
  searchFast.value = false
  items.value = textProvider.value.textIds.filter((id) =>
    searchTerm.value == '' ? true : filterSearch(id)
  )
}

//Fast update handling for input change, only searches shallow.
function updateSearchFast() {
  searchFast.value = true
  items.value = textProvider.value.textIds.filter((id) =>
    searchTerm.value == '' ? true : filterSearchFast(id)
  )
}

//searches in all text and title
function filterSearch(id) {
  return (
    textProvider.value.getTitle(id).toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    textProvider.value.getText(id).toLowerCase().includes(searchTerm.value.toLowerCase())
  )
}
//searches in the first 256 characters of the text and in the title.
function filterSearchFast(id) {
  return (
    textProvider.value.getTitle(id).toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    textProvider.value
      .getText(id, displayTextLength)
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase())
  )
}
</script>

<template>
  <VueHeader
    :title="$t('title.textsearch')"
    :description="$t('description.textsearch')"
  />

  <div class="mainContent">
    <v-container class="w-100 justify-center text-center">
      <h2>{{ $t('textsearch.heading') }}</h2>
    </v-container>
    <v-container>
      <SearchBar
        v-model="searchTerm"
        v-on:search="updateSearch"
        v-on:updateSearch="updateSearchFast"
      />
    </v-container>
    <v-container
      v-for="id in items"
      :key="id"
      class="mt-1 mb-1 hover"
      style="user-select: none"
      @click.stop="$router.push({ name: 'text', params: { id: id, locale: $i18n.locale } })"
    >
      <!-- WARNING: ALLWAYS USE {{  }} if processing user generated content, vuejs will encapsulate it automatically! 
          v-html is only used to comply with the assigned Task! It will not encapsulate the string, be aware of XSS !!! 
          More Information: https://vuejs.org/guide/best-practices/security.html#potential-dangers
        -->
      <h3 class="mt-0" v-html="textPostProcessor.postProcess(textProvider.getTitle(id))"></h3>
      <div
        v-html="textPostProcessor.postProcess(textProvider.getText(id, displayTextLength)) + '..'"
      ></div>

      <hr v-if="id != items[items.length - 1]" />
    </v-container>
    <v-container class="mt-1 mb-1" v-if="items.length === 0">
      <h4 v-if="searchFast">{{ $t('textsearch.nothingfound.fast') }}</h4>
      <h4 v-if="!searchFast">{{ $t('textsearch.nothingfound') }}</h4>
    </v-container>
  </div>
</template>

<style scoped>
hr {
  border: 1px solid rgb(var(--v-theme-accent));
  margin-top: 2em;
}

.hover {
  cursor: pointer;
}

.hover:hover {
  text-decoration: underline;
  font-size: 1.01em;
}
</style>
