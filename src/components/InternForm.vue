<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import apiClient from "@/plugins/axios";

const { smAndDown } = useDisplay();
const router = useRouter();

const firstName = ref<string | null>(null);
const lastName = ref<string | null>(null);
const internId = ref<string>("");
const isCameraActive = ref<boolean>(false);
const photo = ref<string | null>(null);
const loading = ref<boolean>(false);
const successSnackbar = ref<boolean>(false);
const errorSnackbar = ref<boolean>(false);
const snackbarText = ref<string>("");
const isDeleteDialogVisible = ref(false);
const internFormRef = ref();
const valueRequired = [(v: any) => !!v || "Field is required"];

const addIntern = async (payload: {
  name: string;
  lastName: string;
  avatar: string;
}) => {
  loading.value = true;

  try {
    const response = await apiClient.post("/users", payload);
    if (response.status === 201) {
      successSnackbar.value = true;
      snackbarText.value = "New intern successfully created!";
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  } catch (error) {
    console.error("Error while adding intern:", error);
    errorSnackbar.value = true;
    snackbarText.value =
      "An error occured while adding new intern, please try again.";
  } finally {
    loading.value = false;
  }
};

const updateIntern = async (
  internId: string,
  payload: { name: string; lastName: string; avatar: string }
) => {
  loading.value = true;

  try {
    const response = await apiClient.patch(`/users/${internId}`, payload);
    if (response.status === 200) {
      successSnackbar.value = true;
      snackbarText.value = "Intern updated successfully!";
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  } catch (error) {
    console.error("Error updating intern data:", error);
    errorSnackbar.value = true;
    snackbarText.value = "An error occurred while updating intern data.";
  } finally {
    loading.value = false;
  }
};

const handleFormSubmit = async () => {
  const isFormValid = await internFormRef.value.validate();
  errorSnackbar.value = !photo.value;
  snackbarText.value = "Please take a photo before submitting the form.";
  if (isFormValid.valid && photo.value) {
    //This payload is deliberately not matching the one from API documentation for showcase purposes as there is no validation set on this route.
    const payload = {
      name: firstName.value as string,
      lastName: lastName.value as string,
      avatar: photo.value as string,
    };

    if (internId.value) {
      updateIntern(internId.value, payload);
    } else {
      addIntern(payload);
    }
  }
};

const fetchIntern = async (internId: string) => {
  try {
    const response = await apiClient.get(`/users/${internId}`);
    const internData = response.data.data;
    firstName.value = internData.first_name;
    lastName.value = internData.last_name;
    photo.value = internData.avatar;
  } catch (error) {
    console.error("Error fetching intern data:", error);
    errorSnackbar.value = true;
    snackbarText.value = "An error occurred while fetching intern data.";
  }
};

const openDeleteDialog = () => {
  isDeleteDialogVisible.value = true;
};

const closeDeleteDialog = () => {
  isDeleteDialogVisible.value = false;
};

const deleteIntern = async () => {
  try {
    await apiClient.delete(`/users/${internId.value}`);
    successSnackbar.value = true;
    snackbarText.value = "Intern deleted successfully!";
    setTimeout(() => {
      router.push("/");
    }, 2000);
  } catch (error) {
    console.error("Error deleting intern:", error);
    errorSnackbar.value = true;
    snackbarText.value = "An error occurred while deleting intern.";
  }

  closeDeleteDialog();
};

const onPhotoCaptured = (photoUrl: string) => {
  photo.value = photoUrl;
};

const onStartCamera = () => {
  photo.value = null;
  isCameraActive.value = true;
};

const onStopCamera = () => {
  isCameraActive.value = false;
};

onMounted(() => {
  internId.value = router.currentRoute.value.params.id as string;
  if (internId.value) {
    fetchIntern(internId.value);
  }
});
</script>

<template>
  <v-container>
    <DeleteDialog
      :isVisible="isDeleteDialogVisible"
      :onDelete="deleteIntern"
      :onClose="closeDeleteDialog"
    />
    <div v-if="!internId" class="text-h4 mb-6">Add Intern</div>
    <div v-else class="text-h4 mb-6">Edit Intern</div>
    <v-form ref="internFormRef" @submit.prevent="handleFormSubmit">
      <v-row class="h-75">
        <v-col cols="12" md="8" class="h-75 pb-10" :order="smAndDown ? 1 : 0">
          <v-sheet class="d-flex flex-column pa-5 px-8 constraints">
            <v-row class="mt-12">
              <v-col cols="12" md="6">
                <label for="first_name_input" class="font-weight-bold"
                  >First Name</label
                >
                <v-text-field
                  v-model="firstName"
                  :rules="valueRequired"
                  id="first_name_input"
                  class="mt-2"
                  placeholder="Enter intern first name"
                  density="compact"
                  variant="outlined"
              /></v-col>
              <v-col cols="12" md="6">
                <label for="last_name_input" class="font-weight-bold"
                  >Last Name</label
                >
                <v-text-field
                  v-model="lastName"
                  :rules="valueRequired"
                  id="last_name_input"
                  class="mt-2"
                  placeholder="Enter intern last name"
                  density="compact"
                  variant="outlined"
              /></v-col>
            </v-row>
            <div :class="!smAndDown && 'd-flex justify-space-between'">
              <v-btn
                id="intern_form_submit_btn"
                type="submit"
                color="#459672"
                flat
                height="44"
                width="120"
                :block="smAndDown"
                :class="smAndDown && 'mt-6'"
                :loading="loading"
              >
                <p v-if="!internId" class="text-body-1 mb-0">Add Intern</p>
                <p v-else class="text-body-1 mb-0">Edit Intern</p>
              </v-btn>
              <v-btn
                @click="openDeleteDialog()"
                v-if="internId"
                id="intern_delete_btn"
                type="button"
                color="error"
                flat
                height="44"
                width="120"
                :block="smAndDown"
                :class="smAndDown && 'mt-6'"
                :loading="loading"
              >
                <p class="text-body-1 mb-0">Delete Intern</p>
              </v-btn>
            </div>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="4" class="h-75 pb-10">
          <CameraCapture
            :photo="photo"
            :isCameraActive="isCameraActive"
            @photoCaptured="onPhotoCaptured"
            @starCamera="onStartCamera"
            @stopCamera="onStopCamera"
          />
        </v-col>
      </v-row>
      <v-snackbar
        v-model="errorSnackbar"
        :text="snackbarText"
        color="error"
        rounded
      >
      </v-snackbar>
      <v-snackbar
        v-model="successSnackbar"
        :text="snackbarText"
        color="success"
        rounded
      >
      </v-snackbar>
    </v-form>
  </v-container>
</template>

<style scoped>
.video-circle {
  border-radius: 50%;
  object-fit: cover;
}
.avatar {
  border: 2px solid #f5f5f5;
}
.constraints {
  max-height: 425px;
  min-height: 325px;
}
</style>
