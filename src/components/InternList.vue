<script setup lang="ts">
import { ref } from "vue";
import type { Intern } from "@/types/intern";

const interns = ref<Intern[]>([
  {
    id: 1,
    firstName: "Milos",
    lastName: "Stojanovic",
    avatar: "url_to_avatar",
  },
  { id: 2, firstName: "Reva", lastName: "Frami", avatar: "url_to_avatar" },
]);
const search = ref<string>("");
const activePage = ref<number>(0);
const headers = [
  { text: "Full Name", value: "fullName" },
  { text: "Action", value: "action", sortable: false },
];
const getInterns = async () => {};
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
        <v-list>
            <v-list-item v-for="(intern, index) in interns">
                <v-row>
                    <v-col>
                        {{ intern.firstName }} {{ intern.lastName }}
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
