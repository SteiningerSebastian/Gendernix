<script setup>
import { ref } from 'vue'
// import { IOCContainer } from '../lib/IOCContainer'
import { computed } from 'vue'

const props = defineProps(['value', 'width', 'height', 'highlights'])

// const xssProtector = IOCContainer.instance.resolve('IXSSProtector')

function onInput(target, emit) {
  // handleInput(target)
  emit('update:modelValue', target.value)
}

const vmTextarea = ref()

//#region  Highlights
//Inspired by: https://codersblock.com/blog/highlight-text-inside-a-textarea/

const highlighted = computed(() => {
  let text = vmTextarea.value ?? ''

  let markers = []
  for (let i = 0; i < props.highlights.length; i++) {
    markers.push({
      position: props.highlights[i].start,
      marker: 0
    })

    markers.push({
      position: props.highlights[i].end,
      marker: 1
    })
  }

  markers.sort((a, b) => {
    return a.position - b.position
  })

  for (let i = 0; i < markers.length; i++) {
    for (let j = i + 1; j < markers.length; j++) {
      markers[j].position += (markers[i].marker === 0 ? 6 : 7)
    }
  }

  for (let i = 0; i < markers.length; i++) {
    const marker = markers[i]

    text =
      text.substring(0, marker.position) +
      (marker.marker === 0 ? '<mark>' : '</mark>') +
      text.substring(marker.position, text.length)
  }
  return text
})

function handleScroll(target, target1) {
  const scrollPos = target.scrollTop
  target1.style.top = -scrollPos + 'px'
}

//#endregion
</script>
<template>
  <div class="container">
    <div class="backdrop" ref="backdrop">
      <div class="highlights" v-html="highlighted"></div>
    </div>
    <div class="textareaContainer">
      <textarea
        class="txtArea"
        label=""
        v-model="vmTextarea"
        v-bind="props.value"
        v-on:input="onInput($event.target, $emit)"
        v-on:scroll="handleScroll($event.target, $refs.backdrop)"
      ></textarea>
    </div>
  </div>
</template>
<style scoped>
.highlights {
  white-space: pre-wrap;
  word-wrap: break-word;
  color: transparent;
  outline: none;
  border: none;
  resize: none;
  width: 100%;
  height: 100%;
  font-size: 16px;
}

.backdrop {
  overflow: visible;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: fit-content;
  padding: 1em;
  /* Account for scroll bar which is 12px in width as defined bellow. Textare does this automatically because it owns the scrollbar. */
  padding-inline-end: calc(1em + 12px); 
}

.txtArea {
  position: relative;
  color: rgb(var(--v-theme-text));
  background-color: transparent;
  outline: none;
  border: none;
  overflow-y: scroll;
  resize: none;
  width: 100%;
  height: fit-content;
  font-size: 16px;
  min-height: 100%;
  padding: 1em;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.textareaContainer {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

.container {
  position: relative;
  background-color: rgb(var(--v-theme-tertiary));
  font-size: 16px;
  margin: 0;
  padding: 0;
  margin-bottom: 4em;
  width: 100%;
  height: 50vh;
  overflow-y: hidden;
}

/* Inspired by https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp */
/* width */
::-webkit-scrollbar {
  width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(var(--v-theme-text));
  cursor: pointer;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-accent));
}
</style>
