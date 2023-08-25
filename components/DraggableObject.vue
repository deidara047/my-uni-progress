<template>
  <div
    class="draggable"
    :style="{ transform: `translate(${position.x}px, ${position.y}px)`, transition: !isDragging ? 'transform 0.3s ease': 'unset'}"
    @mousedown="startDragging"
  >
    <slot />
  </div>
</template>

<script setup>
// Probably I wont use this component but I'll save it, just in case
import { ref, reactive } from 'vue';

const position = reactive({ x: props.initialPosition.x, y: props.initialPosition.y });
const isDragging = ref(false);

const props = defineProps({
  initialPosition: {
    type: Object,
    required: true
  }
})

const startDragging = (event) => {
  isDragging.value = true;
  props.initialPosition.x = event.clientX - position.x;
  props.initialPosition.y = event.clientY - position.y;

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', stopDragging);
};

const handleMouseMove = (event) => {
  if (isDragging.value) {
    position.x = event.clientX - props.initialPosition.x;
    position.y = event.clientY - props.initialPosition.y;
  }
};

const stopDragging = () => {
  isDragging.value = false;
  resetPosition();
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', stopDragging);
};

const resetPosition = () => {
  if (!isDragging.value) {
    position.x = props.initialPosition.x;
    position.y = props.initialPosition.y;
  }
};
</script>

<style scoped>
.draggable {
  cursor: move;
  user-select: none;
}
</style>
