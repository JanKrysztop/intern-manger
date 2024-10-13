<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useDisplay } from "vuetify";
import type { Intern } from "@/types/intern";
import apiClient from "@/plugins/axios";

const { mdAndUp, lgAndUp, xl } = useDisplay();

const interns = ref<Intern[]>([]);
const search = ref<string>("");
const activePage = ref<number>(0);

const getInterns = async () => {
  try {
    const response = await apiClient.get("/users?page=1");
    console.log(response.data);
    if (response.status === 200) {
      interns.value = response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const editIntern = (intern: Intern) => {
  console.log(intern);
};

const deleteIntern = (id: number) => {
  console.log(id);
};

const computedMargin = computed(() => {
  if (xl.value) return "64px";
  if (lgAndUp.value) return "32px";
  if (mdAndUp.value) return "16px";
  return "8px";
});

onMounted(() => {
  getInterns();
});
</script>

<template>
  <v-container>
    <div class="text-h4 mb-6">Interns List</div>
    <v-sheet :elevation="1" rounded class="pa-5">
      <v-row>
        <v-col cols="3">
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
        <v-col>
          <v-list>
            <v-list-item class="pl-0">
              <div class="d-flex align-center justify-space-between px-2">
                <div class="d-flex align-center">
                  <v-avatar
                    size="40"
                    :style="{ marginRight: computedMargin }"
                  ></v-avatar>
                  <p class="mb-0 font-weight-bold">Full name</p>
                </div>
                <div class="d-flex" :style="{ marginRight: computedMargin }">
                  <p class="mb-0 font-weight-bold">Action</p>
                </div>
              </div>
            </v-list-item>
            <v-list-item
              v-for="(intern, index) in interns"
              :key="intern.id"
              :class="{ 'bg-gray-100': index % 2 === 0 }"
              class="pl-0"
              rounded
            >
              <div class="d-flex align-center justify-space-between pa-2">
                <div class="d-flex align-center">
                  <v-avatar
                    :image="intern.avatar"
                    size="40"
                    :style="{ marginRight: computedMargin }"
                  ></v-avatar>
                  <p class="mb-0">
                    {{ intern.first_name }} {{ intern.last_name }}
                  </p>
                </div>
                <div class="d-flex" :style="{ marginRight: computedMargin }">
                  <v-btn
                 
                    variant="plain"
                    @click="editIntern(intern)"
                    size="xs"
                  >
                  <v-icon>mdi-square-edit-outline</v-icon>
                    <v-tooltip activator="parent" location="start"
                      >Edit intern data</v-tooltip
                    >
                  </v-btn>
                  <v-btn
                    variant="plain"
                    @click="deleteIntern(intern.id)"
                    size="xs"
                  >
                  <v-icon>mdi-delete</v-icon>
                    <v-tooltip activator="parent" location="end"
                      >Delete intern</v-tooltip
                    >
                  </v-btn>
                </div>
              </div>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-sheet>
    <v-pagination :length="11"></v-pagination>
  </v-container>
</template>

<style scoped>
.bg-gray-100 {
  background-color: #f5f5f5;
}
</style>
