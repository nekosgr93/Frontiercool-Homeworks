<script setup lang="ts">
import type { User } from "../../types/user";
import { UserCard } from "../items";

defineProps<{
  users: User[];
}>();
</script>

<template lang="pug">
div(class=["container", "grid", "md:gap-4", "xl:gap-8","sm:grid-cols-2", "md:grid-cols-4", "xl:grid-cols-5"])
  UserCard(
    v-for="user in users" 
    :key="user.id.value" 
    :user-name="user.name.last + user.name.first"
    :photo-url="user.picture.medium"
    )
</template>

<style scoped></style>
