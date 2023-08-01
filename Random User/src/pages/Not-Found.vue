<template lang="pug">
.flex.flex-1.h-screen.flex-col.justify-center.items-center.space-y-4
  h1.text-4xl 404 - Not Found

  router-link(to="/") 
    p.text-xl.text-blue-600.underline.decoration-blue-600(class=["hover:text-blue-400", "hover:decoration-blue-400"]) Redirect to home page
</template>

<script setup lang="ts"></script>

<style scoped></style>
