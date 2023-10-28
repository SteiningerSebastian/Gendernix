<script setup>
import { RouterLink, RouterView } from 'vue-router'
import logo from './assets/logo.svg'
import NavBarItem from './components/NavBarItem.vue'
</script>

<template>
  <v-layout ref="app" class="rounded rounded-md">
    <v-app-bar height="50" app>
      <v-app-bar-nav-icon
        class="hidden-lg-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-img
        class="mx-2 hidden-md-and-down"
        :src="logo"
        max-width="36"
        max-height="36"
        contain
      ></v-img>
      <v-toolbar-title class="ml-2">
        <span class="hidden-md-and-down" width="6.35em" style="padding-inline-end: 142px"
          >Gendernix</span
        >
        <span>
          <NavBarItem :text="$t('nav.home')" to="/" />
          <NavBarItem :text="$t('nav.gender')" to="/gender" />
          <NavBarItem :text="$t('nav.text')" to="/text" />
        </span>
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      width="300"
      class="navigation-drawer"
      v-model="drawer"
      :permanent="permanent"
      expand-on-hover
      clipped
      app
    >
      <div>
        <!-- The Logo and Title of the Website -->
        <div
          class="hidden-lg-and-up"
          width="fit-content"
          style="
            font-size: 1.5em;
            vertical-align: middle;
            justify-content: center;
            height: 36px;
            padding-top: 0.5em;
            padding-left: 0.75em;
          "
        >
          <div style="width: 64px; padding: 0; float: left">
            <v-img
              class="mx-2 hidden-lg-and-up"
              :src="logo"
              max-width="36"
              max-height="36"
              contain
            />
          </div>
          Gendernix
        </div>

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
      </div>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center">
      <RouterView />
    </v-main>

    <v-footer height="50" app name="footer">
      <RouterLink class="aLink" to="/imprint">{{ $t('footer.imprint') }}</RouterLink>
      <RouterLink class="aLink" to="/imprint">{{ $t('footer.contact') }}</RouterLink>
      <RouterLink class="aLink" to="/imprint">{{ $t('footer.dataprotection') }}</RouterLink>
    </v-footer>
  </v-layout>
</template>

<style scoped>
.aLink {
  color: rgb(var(--v-theme-text));
  text-decoration: none;
  padding: 0 1em 0 1em;
}

.aLink:hover {
  text-decoration: underline;
}

.navList {
  vertical-align: top;
  text-align: start;
  margin: 0;
  padding: 0;
  font-size: 1.25em;
  margin-top: 1.5em;
  margin-left: 1.25em;
  width: 100%;
  height: fit-content;
}

.navList li {
  list-style: none;
}

.navList li ul li {
  list-style: disc;
  margin-left: 2em;
  font-size: 0.75em;
}

.navigation-drawer {
  border-right: none;
}

@media only screen and (max-width: 1280px) {
  .navigation-drawer {
    border-right: 1px solid rgb(var(--v-theme-tertiary));
    border-top: 1px solid rgb(var(--v-theme-tertiary));
    border-bottom: 1px solid rgb(var(--v-theme-tertiary));
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
