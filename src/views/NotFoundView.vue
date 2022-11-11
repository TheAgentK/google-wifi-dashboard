<template>
  <div>
    <h1>{{ $t("404.title") }}</h1>
    <button @click="$router.push('/')">{{ $t("404.back") }}</button>
  </div>
</template>
