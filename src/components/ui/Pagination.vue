<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  activePage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "update:activePage", pageNumber: number): void;
}>();

const selectActivePage = (pageNumber: number) => {
  emit("update:activePage", pageNumber);
};
</script>

<template>
  <div class="d-flex mt-6">
    <div
      v-for="index in totalPages + 2"
      :key="index"
      class="pagination-box"
      :class="{ 'active-box': index === activePage + 1 }"
    >
      <button
        :disabled="activePage === 1"
        v-if="index === 1"
        @click="selectActivePage(activePage - 1)"
        class="w-100 h-100"
      >
        <v-icon size="16">mdi-chevron-double-left</v-icon>
      </button>
      <button
        :disabled="activePage === totalPages"
        v-else-if="index === totalPages + 2"
        @click="selectActivePage(activePage + 1)"
        class="w-100 h-100"
      >
        <v-icon size="16">mdi-chevron-double-right</v-icon>
      </button>
      <button v-else @click="selectActivePage(index - 1)" class="w-100 h-100">
        {{ index - 1 }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagination-box {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 35px;
  min-height: 35px;
  background-color: #fff;
  border: 1px solid #cdcdcd;
  color: #459672;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.pagination-box:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.pagination-box:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.active-box {
  background-color: #459672;
  border-color: #459672;
  color: #fff;
}

.pagination-box:hover:not(:has(button:disabled)) {
  background-color: #b5d8c3;
  border-color: #b5d8c3;
  color: #459672;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>