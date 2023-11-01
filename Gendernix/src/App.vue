<script setup>
import { RouterLink, RouterView } from 'vue-router'

import LanguageSelector from './components/LanguageSelector.vue'

//Import icons
import NavBarItem from './components/NavBarItem.vue'
import TitleIcon from './components/TitleIcon.vue'

import { IOCContainer } from './lib/IOCContainer'
import { ref } from 'vue'
import { useLocale } from 'vuetify'

const textProvider = ref(IOCContainer.instance.resolve('ITextProvider'))
const textPostProcessor = ref(IOCContainer.instance.resolve('ITextPostProcessor'))

const drawer = ref();

</script>

<!-- The application layout was inspired by https://vuetifyjs.com/en/features/application-layout/#complex-layouts -->
<template>
  <v-layout ref="app" class="rounded rounded">
    <v-app-bar height="50" app>
      <v-app-bar-nav-icon
        class="hidden-lg-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <div class="hidden-md-and-down ps-4" style="padding-inline-end: 87px"><TitleIcon /></div>
      <v-toolbar-title>
        <span>
          <NavBarItem :text="$t('nav.home')" to="/" />
          <NavBarItem :text="$t('nav.gender')" to="/gender" />
          <NavBarItem :text="$t('nav.text')" to="/textsearch" />
        </span>
      </v-toolbar-title>
      <span class="hidden-md-and-down pe-3 pt-2"><LanguageSelector /></span>
    </v-app-bar>
    <v-navigation-drawer
      width="300"
      class="navigation-drawer"
      v-model="drawer"
      app
      ><v-container>
        <div class="ps-3 pt-5 hidden-lg-and-up"><TitleIcon /></div>

        <ul class="navList">
          <li>
            <RouterLink class="aLink" to="/">{{ $t('nav.drawer.home') }}</RouterLink>
          </li>
          <li>
            <ul>
              <li>
                <RouterLink class="aLink" to="/#gendernix">{{
                  $t('nav.drawer.home.gendernix')
                }}</RouterLink>
              </li>
              <li>
                <RouterLink class="aLink" to="/#getstarted">{{
                  $t('nav.drawer.home.getStarted')
                }}</RouterLink>
              </li>
            </ul>
          </li>
          <li>
            <RouterLink class="aLink" to="/gender">{{ $t('nav.drawer.home.gender') }}</RouterLink>
          </li>
          <li>
            <RouterLink class="aLink" to="/textsearch">{{ $t('nav.drawer.text') }}</RouterLink>
          </li>
          <li>
            <ul>
              <!-- Inspired by https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key -->
              <li v-for="id in textProvider.textIds" :key="id">
                <RouterLink class="aLink" :to="{ name: 'text', params: { id: id } }">{{
                  textPostProcessor.postProcess(textProvider.getTitle(id))
                }}</RouterLink>
              </li>
            </ul>
          </li>
        </ul>
        <div
          class="hidden-lg-and-up"
          style="position: absolute; bottom: 0; margin-inline-start: 215px"
        >
          <LanguageSelector />
        </div>
      </v-container>
    </v-navigation-drawer>

    <!-- The content of the app, the RouterView unable to use v-main due to positioning issues -->
    <div
      class="main pa-0"
      app
      :style="{ direction: useLocale().isRtl.value ? 'rtl' : 'ltr' }"
    >
      <RouterView />
    </div>

    <v-footer height="50" app name="footer">
      <v-container>
        <RouterLink class="aLink pe-6" to="/imprint">{{ $t('footer.imprint') }}</RouterLink>
        <RouterLink class="aLink pe-6" to="/imprint">{{ $t('footer.contact') }}</RouterLink>
        <a
          class="aLink pe-6"
          :href="$i18n.locale == 'de' ? '/Datenschutzerklaerung.pdf' : '/PrivacyPolicy.pdf'"
          target="_blank"
          >{{ $t('footer.dataprotection') }}</a
        >
      </v-container>
    </v-footer>
  </v-layout>
</template>

<style scoped>
.main {
  position: relative;
  margin-top: 50px;
  margin-inline-start: 300px;
  padding-bottom: 50px;
  width: calc(100vw - 300px);
  height: fit-content;
  min-height: calc(100vh - 100px);
}

.v-btn--icon {
  background-color: #00000000 !important;
}

.aLink {
  color: rgb(var(--v-theme-text));
  text-decoration: none;
}

.aLink:hover {
  text-decoration: underline;
}

.navList {
  vertical-align: top;
  margin: 0;
  padding: 0;
  font-size: 1.25em;
  margin-top: 1.5em;
  margin-inline-start: 1.25em;
  width: 100%;
  height: fit-content;
}

.navList li {
  list-style: none;
}

.navList li ul li {
  list-style: disc;
  margin-inline-start: 3em;
  padding: 0 !important;
  font-size: 0.75em;
}

.navigation-drawer {
  border-inline-end: none;
}

@media only screen and (max-width: 1280px) {
  .navigation-drawer {
    border-inline-end: 1px solid rgb(var(--v-theme-tertiary));
    border-top: 1px solid rgb(var(--v-theme-tertiary));
    border-bottom: 1px solid rgb(var(--v-theme-tertiary));
  }

  .main {
    position: absolute;
    margin-inline-start: 0;
    margin-top: 50px;
    padding-bottom: 50px;
    width: 100%;
    height: fit-content;
    min-height: calc(100% - 50px);
  }
}
</style>

<script>

</script>
