<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

Vue.component("Swiper", Swiper);
Vue.component("SwiperSlide", SwiperSlide);

@Component
export default class App extends Vue {}
</script>
