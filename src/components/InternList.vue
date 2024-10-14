<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from 'vue-router';
import { useDisplay } from "vuetify";
import type { Intern } from "@/types/intern";
import apiClient from "@/plugins/axios";

const router = useRouter(); 
const { mdAndUp, lgAndUp, xl } = useDisplay();

const interns = ref<Intern[]>([]);
const search = ref<string>("");
const activePage = ref<number>(1);
const totalPages = ref<number>(0);
const loading = ref<boolean>(false)

const getInterns = async () => {
  loading.value = true
  try {
    const response = await apiClient.get(
      `/users?page=${activePage.value}&per_page=8`
    );
    console.log(response.data);
    if (response.status === 200) {
      interns.value = response.data.data;
      totalPages.value = response.data.total_pages;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
  }
};

const navigateToInternForm = () => {
  router.push('/add')
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

const filteredInterns = computed(() => {
  if (search.value) {
    return interns.value.filter(
      (user) =>
        user.first_name.toLowerCase().includes(search.value.toLowerCase()) ||
        user.last_name.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  return interns.value;
});

watch(activePage, () => {
  console.log("im watching here", activePage.value);
  getInterns();
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
              min-width="220"
              clearable
              flat
              single-line
            ></v-text-field>
          </v-col>
          <v-col class="text-right">
            <v-btn @click="navigateToInternForm" color="#459672" rounded flat height="44">
              <v-icon size="17" class="pl-2 pr-6">mdi-plus-thick</v-icon>
              <p class="text-body-1 mb-0">Add User</p>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-progress-linear v-if="loading" color="#459672" indeterminate></v-progress-linear>
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
                v-for="(intern, index) in filteredInterns"
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
                      class="mr-1"
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
      <Pagination
        :activePage="activePage"
        :totalPages="totalPages"
        @update:activePage="activePage = $event"
      />
    </v-container>
  </div>
</template>

<style scoped>
.bg-gray-100 {
  background-color: #f5f5f5;
}
</style>
