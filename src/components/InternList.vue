<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useDisplay } from "vuetify";
import type { Intern } from "@/types/intern";
import apiClient from "@/plugins/axios";

const { mdAndUp, lgAndUp, xl } = useDisplay();

const interns = ref<Intern[]>([]);
const search = ref<string>("");
const activePage = ref<number>(2);
const totalPages = ref<number>(0);

const getInterns = async () => {
  try {
    const response = await apiClient.get("/users?page=1");
    console.log(response.data);
    if (response.status === 200) {
      interns.value = response.data.data;
      totalPages.value = response.data.total_pages;
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

const selectActivePage = (pageNumber: number) => {
  activePage.value = pageNumber;
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
  <div class="d-flex justify-center align-center h-100 w-100">
    <v-container class="list-wrapper">
      <div class="text-h4 mb-6">Interns List</div>
      <v-sheet class="pa-5" rounded>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="search"
              label="Search for users..."
              density="compact"
              variant="solo-filled"
              append-inner-icon="mdi-magnify"
              clearable
              flat
              single-line
            ></v-text-field>
          </v-col>
          <v-col class="text-right">
            <v-btn color="#459672" rounded flat height="44">
              <v-icon size="17" class="pl-2 pr-6">mdi-plus-thick</v-icon>
              <p class="text-body-1 mb-0">Add User</p>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
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
      <div class="d-flex mt-2">
        <div
          v-for="index in totalPages + 2"
          :key="index"
          class="pagination-box"
          :class="{ 'active-box': index === activePage }"
        >
          <button :disabled="activePage === 2" v-if="index === 1" @click="selectActivePage(activePage - 1)" class="w-100 h-100">
            <v-icon size="16">mdi-chevron-double-left</v-icon>
          </button>
          <button :disabled="activePage === totalPages + 1" v-else-if="index === totalPages + 2" @click="selectActivePage(activePage + 1)" class="w-100 h-100">
            <v-icon size="16">mdi-chevron-double-right</v-icon>
          </button>
          <button v-else @click="selectActivePage(index)" class="w-100 h-100">
            {{ index - 1 }}
          </button>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.bg-gray-100 {
  background-color: #f5f5f5;
}
.pagination-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
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
/* button:focus {
  outline: 2px solid #459672;
} */
</style>
