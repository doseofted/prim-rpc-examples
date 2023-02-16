<template>
  <p v-if="!pending">
    <!-- Check if promise has resolved (pending === false) and then display returned value -->
    {{ greeting }}
</p>
</template>

<script lang="ts" setup>
// Gather function arguments from route's query (and use fallback values if not given)
const route = useRoute()
const x = computed(() => route.query.x?.toString() ?? "Backend")
const y = computed(() => route.query.y?.toString() ?? "Frontend")
// Make a function call using Prim+RPC (`useAsyncData` is Nuxt's way of handling returned promise)
// Optionally, pass references to `useAsyncData`'s `.watch` if you'd like to automatically refetch on value changes
const { data: greeting, pending } = useAsyncData(() => backend.sayHello(x.value, y.value), {
  watch: [x, y]
})
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