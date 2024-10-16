<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  isVisible: boolean;
  onDelete: () => void;
  onClose: () => void;
}>();

const isDialogVisible = ref(props.isVisible);

watch(
  () => props.isVisible,
  (newValue) => {
    isDialogVisible.value = newValue;
  }
);

const confirmDelete = () => {
  props.onDelete();
  isDialogVisible.value = false;
};

const cancelDelete = () => {
  props.onClose();
  isDialogVisible.value = false;
};
</script>

<template>
  <v-dialog v-model="isDialogVisible" max-width="400" persistent>
    <v-card>
      <v-card-title class="text-h5">Delete Intern</v-card-title>
      <v-card-text>
        <p>Are you sure you want to delete this intern ?</p>
        <p>This action is irreversible</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="cancelDelete" color="grey">Cancel</v-btn>
        <v-btn @click="confirmDelete" color="red">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
