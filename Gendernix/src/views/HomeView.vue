<script setup>
import SectionHeader from '../components/SectionHeader.vue'
import InfoCardHome from '../components/InfoCardHome.vue'
import JusticeIcon from '../components/icons/JusticeIcon.vue'
import FileIcon from '../components/icons/FileIcon.vue'
import InternationalisationIcon from '../components/icons/InternationalisationIcon.vue'
import inclusivityImage from '../assets/inclusivity.jpg'
</script>

<template>
  <v-img :src="inclusivityImage" max-height="260px" cover rounded="0" />
  <div class="mainContent">
    <v-container>
      <section id="gendernix" class="pt-6">
        <SectionHeader :heading="$t('home.gendernix.heading')" />
        <v-container class="ps-0 pt-5 pb-3">{{ $t('home.gendernix.text1') }}</v-container>
        <v-container class="ps-0 cardcontainer">
          <InfoCardHome
            :title="$t('home.gendernix.card.justice.heading')"
            :text="$t('home.gendernix.card.justice.text')"
          >
            <JusticeIcon />
          </InfoCardHome>

          <InfoCardHome
            :title="$t('home.gendernix.card.editor.heading')"
            :text="$t('home.gendernix.card.editor.text')"
          >
            <FileIcon />
          </InfoCardHome>

          <InfoCardHome
            :title="$t('home.gendernix.card.internationalisation.heading')"
            :text="$t('home.gendernix.card.internationalisation.text')"
          >
            <InternationalisationIcon /> </InfoCardHome
        ></v-container>
      </section>
      <section id="getstarted" class="w-100 pt-6 pb-9">
        <SectionHeader :heading="$t('nav.drawer.home.getStarted')" />
        <v-container class="pa-0 colContainer pb-0">
          <v-container class="colHome ps-0">
            <v-container class="ps-0">
              <h4 class="pb-2">{{ $t('home.getstarted.tool.heading') }}</h4>
              {{ $t('home.getstarted.tool.text') }}
            </v-container>
            <v-btn class="hidden-lg-and-up" rounded="0" to="/gender">{{
              $t('home.getstarted.tool.btn')
            }}</v-btn>
          </v-container>
          <v-container class="colHome ps-0">
            <v-container class="ps-0">
              <h4 class="pb-2">{{ $t('home.getstarted.cms.heading') }}</h4>
              {{ $t('home.getstarted.cms.text') }}</v-container
            >
            <v-btn class="hidden-lg-and-up" rounded="0" to="/imprint">{{
              $t('home.getstarted.cms.btn')
            }}</v-btn>
          </v-container>
        </v-container>
        <v-container class="hidden-md-and-down colContainer pa-0">
          <v-container class="colHome pa-0"
            ><v-btn rounded="0" to="/gender">{{
              $t('home.getstarted.tool.btn')
            }}</v-btn></v-container
          >
          <v-container class="colHome pa-0">
            <v-btn rounded="0" to="/imprint">{{ $t('home.getstarted.cms.btn') }}</v-btn>
          </v-container>
        </v-container>
      </section>
    </v-container>
  </div>
</template>

<style scoped>

h4 {
  font-size: 1.25em;
}

.colContainer {
  display: flex;
}

.colHome {
  width: 50%;
}

.cardcontainer {
  display: flex;
}

@media only screen and (max-width: 1280px) {
  .colHome {
    width: 100%;
  }

  .colContainer {
    display: block;
  }

  .cardcontainer {
    display: block;
  }
}
</style>
