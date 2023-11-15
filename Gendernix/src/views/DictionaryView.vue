<script setup>
import dicNouns from '../assets/gender.dic.json'
import SectionHeader from '../components/SectionHeader.vue'
import VueHeader from '../components/VueHeader.vue'
</script>
<template>
  <div class="mainContent mt-9 mb-9">
    <VueHeader
      :title="$t('dictionary.heading')"
      :description="$t('dictionary.description')"
    />
    <section>
      <SectionHeader :heading="$t('dictionary.heading')" />

      <v-container>
        {{ $t('dictionary.body.description.p1') }}
        <a href="https://github.com/gambolputty/german-nouns/tree/main" target="_blank">https://github.com/gambolputty/german-nouns/tree/main</a> 
        {{ $t('dictionary.body.description.p2') }}
      </v-container>
      <v-container class="ma-0 pt-0">
        {{ $t('dictionary.body.license.p1') }} <a href="https://github.com/gambolputty/german-nouns/blob/main/LICENSE" target="_blank">"Createive Commons Attribution Share Alike 4.0 International"</a>
        {{ $t('dictionary.body.license.p2') }}
       <a href="https://de.wiktionary.org/">WiktionaryDE</a> 
       {{ $t('dictionary.body.license.p3') }}
      </v-container>

      <v-container class="mt-0 pt-0">
        <v-table fixed-header style="height: 55vh">
          <thead>
            <tr>
              <th class="text-left">Maskulinum</th>
              <th class="text-left">Gendered</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Object.keys(dicNouns.wordlist)" :key="item">
              <td>{{ item.split(';')[0] }}</td>
              <td>{{ dicNouns.wordlist[item] }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </section>
  </div>
</template>
<style scoped></style>
