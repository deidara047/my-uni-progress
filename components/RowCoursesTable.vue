<style scoped>
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 130px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 2;
  bottom: 125%;
  left: 50%;
  margin-left: -65px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>

<template>
  <tr class="bg-white border-b">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-end whitespace-nowrap">
      {{ props.index + 1 }}
    </th>
    <td class="px-6 py-4 text-center">
      {{ props.code }}
    </td>
    <td class="px-6 py-4 text-center">
      {{ props.name }}
    </td>
    <td class="px-6 py-4 text-center">
      {{ props.semester }}
    </td>
    <td class="px-6 py-4 text-center">
      <font-awesome-icon v-if="props.isRequired" :icon="['fas', 'check']" style="color: #27ae60" />
      <font-awesome-icon v-else :icon="['fas', 'xmark']" style="color: #c0392b" />
    </td>
    <td class="px-6 py-4 text-center">
      <font-awesome-icon v-if="props.isInASeason" :icon="['fas', 'circle']" style="color: #27ae60" />
      <font-awesome-icon v-else :icon="['fas', 'xmark']" />
    </td>
    <td class="px-6 py-4 text-center">
      <button class="btn-secondary" @click="() => onAppButtonClicked('not-approve')" :disabled="props.isLoading"
        v-if="props.isPassed">
        <span v-if="props.isLoading">...</span>
        <span v-else>Desaprobar</span>
      </button>
      <div class="tooltip" v-else>
        <button class="btn-primary" @click="() => onAppButtonClicked('approve')"
          :disabled="props.isLoading || props.isInASeason">
          <span v-if="props.isLoading">...</span>
          <span v-else>Aprobar</span>
        </button>
        <div class="tooltiptext" v-if="props.isInASeason">
          Está en un período
        </div>
      </div>
    </td>
  </tr>
</template>

<script setup>

const emit = defineEmits(["approve-button-clicked"]);

function onAppButtonClicked(type) {
  emit("approve-button-clicked", type, props.code);
}

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  isPassed: {
    type: Boolean,
    required: true
  },
  isRequired: {
    type: Boolean,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  },
  isInASeason: {
    type: Boolean,
    required: true
  }
});


</script>