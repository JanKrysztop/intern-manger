<script setup lang="ts">
import { useDisplay } from "vuetify";
import avatar from "@/assets/avatar.svg";

const { smAndDown } = useDisplay();
</script>

<template>
  <v-container>
    <div class="text-h4 mb-6">Add Intern</div>
    <v-row class="h-75">
      <v-col cols="12" md="8" class="h-75 pb-10" :order="smAndDown ? 1 : 0">
        <v-sheet class="pa-5 px-8 h-100 constraints">
          <v-row class="mt-12 h-75">
            <v-col cols="12" md="6">
              <label for="first-name-input" class="font-weight-bold"
                >First Name</label
              >
              <v-text-field
                class="mt-2"
                id="first-name-input"
                placeholder="Enter intern first name"
                density="compact"
                variant="outlined"
            /></v-col>
            <v-col cols="12" md="6">
              <label for="last-name-input" class="font-weight-bold"
                >Last Name</label
              >
              <v-text-field
                class="mt-2"
                id="last-name-input"
                placeholder="Enter intern last name"
                density="compact"
                variant="outlined"
            /></v-col>
          </v-row>

          <v-btn color="#459672" flat height="44" :block="smAndDown">
            <p class="text-body-1 mb-0">Add Intern</p>
          </v-btn>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="4" class="h-75 pb-10">
        <v-sheet class="pa-5 px-8 h-100 constraints" rounded>
          <v-row class="mt-10 h-75 d-flex justify-center">
            <v-avatar class="avatar" :image="avatar" size="140"></v-avatar>
          </v-row>

          <v-btn
            class="mt-2"
            flat
            height="44"
            block
            variant="outlined"
            color="#636C73"
          >
            <v-icon class="mr-2">mdi-camera</v-icon>
            <p class="text-body-1 mb-0">Add Photo</p>
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.avatar {
  border: 2px solid #f5f5f5;
}
.constraints {
  max-height: 425px;
  min-height: 325px;
}
</style>
