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
      <button class="btn-secondary" @click="() => onAppButtonClicked('not-approve')" :disabled="props.isLoading" v-if="props.isPassed">
        <span v-if="props.isLoading">...</span>
        <span v-else>Desaprobar</span>
      </button>
      <button class="btn-primary" @click="() => onAppButtonClicked('approve')" :disabled="props.isLoading" v-else>
        <span v-if="props.isLoading">...</span>
        <span v-else>Aprobar</span>
      </button>
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
  }
});


</script>