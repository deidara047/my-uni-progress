<style scoped lang="scss">
.tooltip {
  position: relative;
  display: inline-block;

  .tooltiptext {
    visibility: hidden;
    width: 150px;
    background-color: #353b48;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -76px;
    opacity: 0;
    transition: .15s ease-in-out all;
  }

  .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
}
</style>

<template>
  <div class="tooltip">
    <slot></slot>
    <span class="tooltiptext">{{ props.tooltipText }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  tooltipText: {
    type: String,
    required: true
  }
})
</script>