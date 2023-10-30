<script setup>
import { ref } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import TextInput from '../components/TextInput.vue'

const text = ref('')
const input = ref('')
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
        <v-container>
          {{ text }}
        </v-container>
      </section>
    </v-container>
  </div>
</template>
