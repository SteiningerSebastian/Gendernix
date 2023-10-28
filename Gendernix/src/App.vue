<script setup>
import { RouterLink, RouterView } from 'vue-router'

import LanguageSelector from './components/LanguageSelector.vue'

//Import icons
import logo from './assets/logo.svg'
import NavBarItem from './components/NavBarItem.vue'
import TitleIcon from './components/TitleIcon.vue'
</script>

<!-- The application layout was inspired by https://vuetifyjs.com/en/features/application-layout/#complex-layouts -->
<template>
  <v-layout ref="app" class="rounded rounded" style="width: 100vw">
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
          <NavBarItem :text="$t('nav.text')" to="/text" />
        </span>
      </v-toolbar-title>
      <span class="hidden-md-and-down pe-3 pt-2"><LanguageSelector /></span>
    </v-app-bar>
    <v-navigation-drawer
      width="300"
      class="navigation-drawer"
      v-model="drawer"
      :permanent="permanent"
      expand-on-hover
      clipped
      app
      ><v-container>
        <!-- The Logo and Title of the Website -->
        <div class="pl-3 pt-5 hidden-lg-and-up"><TitleIcon /></div>

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
            <RouterLink class="aLink" to="/text">{{ $t('nav.drawer.text') }}</RouterLink>
          </li>
          <li>
            <ul>
              <!-- TODO: Genderate this links automatically based on the provided from the TextProvider -->
              <li>
                <RouterLink class="aLink" to="/text?text=conffeemaker">{{
                  $t('nav.drawer.text.coffeemaker')
                }}</RouterLink>
              </li>
              <li>
                <RouterLink class="aLink" to="/text?text=editor">{{
                  $t('nav.drawer.text.editor')
                }}</RouterLink>
              </li>
              <li>
                <RouterLink class="aLink" to="/text?text=tabCalc">{{
                  $t('nav.drawer.text.tabCalc')
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

    <!-- The content of the app, teh RouterView -->
    <v-main app>
      <v-container class="mainContainer">
        <RouterView />
      </v-container>
    </v-main>

    <v-footer height="50" app name="footer">
      <v-container>
        <RouterLink class="aLink pe-6" to="/imprint">{{ $t('footer.imprint') }}</RouterLink>
        <RouterLink class="aLink pe-6" to="/imprint">{{ $t('footer.contact') }}</RouterLink>
        <RouterLink class="aLink pe-6" to="/imprint">{{ $t('footer.dataprotection') }}</RouterLink>
      </v-container>
    </v-footer>
  </v-layout>
</template>

<style scoped>
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

.mainContainer {
  position: relative;
  padding: 6em;
  padding-top: 3em;
}

@media only screen and (max-width: 1280px) {
  .navigation-drawer {
    border-inline-end: 1px solid rgb(var(--v-theme-tertiary));
    border-top: 1px solid rgb(var(--v-theme-tertiary));
    border-bottom: 1px solid rgb(var(--v-theme-tertiary));
  }

  .mainContainer {
    padding: 2em;
  }
}
</style>

<script>
export default {
  data: () => ({
    drawer: null,
    group: null,
    logo: logo
  }),

  watch: {
    group() {
      this.drawer = false
    }
  }
}
</script>
