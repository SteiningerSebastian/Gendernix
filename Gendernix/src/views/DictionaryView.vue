<script setup>
import { computed } from 'vue'
import dicNouns from '../assets/gender.dic.json'
import SectionHeader from '../components/SectionHeader.vue'
import VueHeader from '../components/VueHeader.vue'

import { VDataTableVirtual } from 'vuetify/lib/labs/components.mjs'

const items = computed(() => {
  let e = []
  Object.keys(dicNouns.wordlist).forEach((key) => {
    e.push({ noun: key.split(';')[0], gendered: dicNouns.wordlist[key] })
  })
  return e
})
</script>
<template>
  <div class="mainContent mt-9 mb-9">
    <VueHeader :title="$t('dictionary.heading')" :description="$t('dictionary.description')" />
    <section>
      <SectionHeader :heading="$t('dictionary.heading')" />

      <v-container>
        {{ $t('dictionary.body.description.p1') }}
        <a href="https://github.com/gambolputty/german-nouns/tree/main" target="_blank">
          https://github.com/gambolputty/german-nouns/tree/main
        </a>
        {{ $t('dictionary.body.description.p2') }}
        <br />
        {{ $t('dictionary.body.license.p1') }}
        <a href="https://github.com/gambolputty/german-nouns/blob/main/LICENSE" target="_blank"
          >"Createive Commons Attribution Share Alike 4.0 International"</a
        >
        {{ $t('dictionary.body.license.p2') }}
        <a href="https://de.wiktionary.org/">WiktionaryDE</a>
        {{ $t('dictionary.body.license.p3') }}
      </v-container>

      <v-container class="mt-0 pt-0">
        <VDataTableVirtual
          :headers="[
            { title: 'Maskulinum', align: 'start', key: 'noun' },
            { title: 'Gendered', align: 'start', key: 'gendered' }
          ]"
          :items="items"
          height="55vh"
          item-value="name"
        ></VDataTableVirtual>
      </v-container>
    </section>
  </div>
</template>
<style scoped></style>
