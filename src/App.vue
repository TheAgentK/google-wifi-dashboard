<script setup>
import LoginWrapper from "@/components/auth/LoginWrapper.vue";
import { useI18n } from "vue-i18n";
import { RouterView } from "vue-router";

// set language from browser
const i18n = useI18n();
i18n.locale.value = navigator.language || navigator.userLanguage;
</script>

<template>
  <div id="app">
    <login-wrapper>
      <RouterView />
    </login-wrapper>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

body {
  background-color: #202125;
  color: #e4e5e9;
  text-align: center;
}

#app {
  font-family: "Open Sans", sans-serif;
}
</style>
