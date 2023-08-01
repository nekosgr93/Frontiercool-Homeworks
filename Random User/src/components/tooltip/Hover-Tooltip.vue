<template lang="pug">
.relative.group.inline-block
  slot
  .absolute.invisible.opacity-0.py-1.px-2.rounded-lg.bg-slate-300.shadow-lg(
    class=[
      "min-w-max",
      "group-hover:visible",
      "group-hover:transition-opacity",
      "group-hover:delay-1000",
      "group-hover:opacity-100"
    ]
    :class=`{ 
      'position-top': position === 'top',
      'position-bottom': position === 'bottom',
      'position-left': position === 'left',
      'position-right': position === 'right'
    }`
  )
    span {{ text }}
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
  }>(),
  {
    position: 'top',
  },
);
</script>

<style scoped>
.position-top {
  @apply -top-11 -left-3
    after:content-['']
    after:absolute
    after:top-full
    after:left-4
    after:border-8
    after:border-transparent
    after:border-t-slate-300;
}

.position-bottom {
  @apply -bottom-12 -left-3
    after:content-['']
    after:absolute
    after:bottom-full
    after:left-4
    after:border-8
    after:border-transparent
    after:border-b-slate-300;
}

.position-left {
  @apply -top-1 right-9
    after:content-['']
    after:absolute
    after:top-2
    after:-right-4
    after:border-8
    after:border-transparent
    after:border-l-slate-300;
}

.position-right {
  @apply -top-1 left-9
  after:content-['']
  after:absolute
  after:top-2
  after:-left-4
  after:border-8
  after:border-transparent
  after:border-r-slate-300;
}
</style>
