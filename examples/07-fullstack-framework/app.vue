<template>{{ greeting }}</template>

<script lang="ts" setup>
const { data: greeting } = useAsyncData(() => backend.sayHello("Backend", "Frontend"))
</script>

<style>
html {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  font-size: 2rem;
  font-family: sans-serif;
  text-align: center;
}
</style>