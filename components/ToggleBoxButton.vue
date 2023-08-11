<template>
  <button @click="() => {emit('right-button-clicked'); isThisColumnOpened = !isThisColumnOpened}" class="hover:bg-slate-200 border font-bold py-1 px-2.5 rounded-full"><font-awesome-icon
          :icon="['fas', (isThisColumnOpened ? 'xmark': 'align-right')]" size="sm" /></button>
</template>

<script setup>
const isThisColumnOpened = ref(null);
const emit = defineEmits(["right-button-clicked"]);

const props = defineProps({
  state: {
    type: Boolean,
    default: true
  }
});

onBeforeMount(() => {
  isThisColumnOpened.value = props.state;
})

</script>