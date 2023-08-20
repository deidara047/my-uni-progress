<style scoped>
.circular-progress::before {
  content: "";
  height: var(--before-size);
  width: var(--before-size);
  position: absolute;
  border-radius: 50%;
  background-color: white;
}
</style>

<template>
  <div class="cpb-container w-fit relative" :style="{ '--before-size': props.radius * 0.7 + 'px' }">
    <div class="circular-progress shadow-lg bg-white flex items-center justify-center rounded-[50%] gap-y-[30px] relavite" :class="[
    ]" :style="{
  background: `conic-gradient(${progressColor} ${3.6 * props.percentage}deg, #ededed 0deg)`,
  height: `${props.radius}px`,
  width: `${props.radius}px`
}">
      <span class="progress-value relative font-semibold" :style="{color: progressColor}">{{ roundNumber(props.percentage) }}%</span>
    </div>

    <div class="text-center mt-2">
      <span class="text-xs text-slate-700">{{ props.text }}</span>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  radius: {
    type: Number,
    default: 120
  },
  percentage: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

const progressColor = computed(() => {
  let colorInicio = [255, 0, 0];
  let colorIntermedio = [243, 156, 18];
  let colorFinal = [46, 204, 113];

  if (props.percentage <= 50) {
    let factor = props.percentage / 50;
    let r = Math.round(colorInicio[0] + (colorIntermedio[0] - colorInicio[0]) * factor);
    let g = Math.round(colorInicio[1] + (colorIntermedio[1] - colorInicio[1]) * factor);
    let b = Math.round(colorInicio[2] + (colorIntermedio[2] - colorInicio[2]) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    let factor = (props.percentage - 50) / 50;
    let r = Math.round(colorIntermedio[0] + (colorFinal[0] - colorIntermedio[0]) * factor);
    let g = Math.round(colorIntermedio[1] + (colorFinal[1] - colorIntermedio[1]) * factor);
    let b = Math.round(colorIntermedio[2] + (colorFinal[2] - colorIntermedio[2]) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  }
});

function roundNumber(num) {
  const rounded = Math.round(num * 100) / 100;

  if (Number.isInteger(rounded)) {
    return rounded.toString();
  } else {
    return rounded.toFixed(2);
  }
}


</script>