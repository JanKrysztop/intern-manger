<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Intern } from "@/types/intern";
import apiClient from '@/plugins/axios';

const interns = ref<Intern[]>([]);
const search = ref<string>("");
const activePage = ref<number>(0);

const getInterns = async () => {
    try {
        const response = await apiClient.get('/users?page=1')
        console.log(response.data)
        if(response.status === 200) {
            interns.value = response.data.data
        }
    } catch (error) {
        console.log(error)
    }
};

onMounted(() => {
    getInterns()
})
</script>
<template>
  <v-container>
    <div class="text-h4 mb-6">Interns List</div>
    <v-sheet :elevation="1" rounded class="pa-5">
      <v-row>
        <v-col>
          <v-text-field
            v-model="search"
            label="Search for users..."
            clearable
          ></v-text-field>
        </v-col>
        <v-col class="text-right">
          <v-btn color="primary">
            <v-icon left>mdi-plus</v-icon>
            Add User
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-list >
            <v-list-item v-for="(intern, index) in interns">
                <v-row>
                    <v-col>
                        {{ intern.first_name }} {{ intern.last_name }}
                    </v-col>
                    <v-col>
                        <v-icon>mdi-pencil</v-icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-col>
                </v-row>
            </v-list-item>
        </v-list>
      </v-row>
    </v-sheet>
    <v-pagination :length="11"></v-pagination>
  </v-container>
</template>
