<template>
  <p>{{ greeting }}</p>
  <NuxtLink :to="`?x=${y}&y=${x}`">Reverse</NuxtLink>
</template>

<script lang="ts" setup>
// Gather function arguments from route's query (and use fallback values if not given)
const route = useRoute()
const x = computed(() => route.query.x?.toString() ?? "Backend")
const y = computed(() => route.query.y?.toString() ?? "Frontend")

const { data: greeting } = useAsyncData(
  // Make a function call using Prim+RPC (`useAsyncData` is Nuxt's way of handling returned promise)
  () => backend.sayHello(x.value, y.value),
  // Optionally, pass references to `.watch` option of `useAsyncData` if you'd like to refetch on value changes
  { watch: [x, y] }
)

useHead({ title: greeting })
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

a {
  color: #aaa;
}
</style>