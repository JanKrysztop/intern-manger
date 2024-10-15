<script setup lang="ts">
import { ref, defineProps, defineEmits, onBeforeUnmount } from "vue";

defineProps<{
  photo: string;
  isCameraActive: boolean;
}>();

const emit = defineEmits<{
  (e: "photoCaptured", photoUrl: string): void;
  (e: "starCamera", clearPhoto: null, setCameraToActive: boolean): void;
  (e: "stopCamera", setCameraToInactive: boolean): void;
}>();

const video = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const stream = ref<MediaStream | null>(null);

const startCamera = async (): Promise<void> => {
  emit("starCamera", null, true);
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });
    if (video.value) {
      video.value.srcObject = stream.value;
    }
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
};

const stopCamera = (): void => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
    emit("stopCamera", false);
  }
};

const capturePhoto = (): void => {
  const ctx = canvas.value?.getContext("2d");
  if (ctx && video.value && canvas.value) {
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;

    ctx.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

    canvas.value.toBlob(
      (blob) => {
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const photoUrl = reader.result as string;
            stopCamera();
            emit("photoCaptured", photoUrl);
          };
          reader.readAsDataURL(blob);
        }
      },
      "image/jpeg",
      0.7
    );
  }
};

onBeforeUnmount(() => {
  stopCamera();
});
</script>

<template>
  <v-sheet
    class="d-flex flex-column align-center pa-5 px-8 h-100 constraints"
    rounded
  >
    <v-avatar
      v-if="!isCameraActive && !photo"
      class="avatar mt-10"
      image="/avatar.svg"
      size="140"
    ></v-avatar>
    <v-avatar
      v-else-if="!isCameraActive && photo"
      class="avatar mt-10"
      :image="photo"
      size="140"
    ></v-avatar>
    <video
      v-else
      ref="video"
      autoplay
      playsinline
      width="140"
      height="140"
      class="video-circle avatar mt-10"
    ></video>
    <v-spacer></v-spacer>
    <v-btn
      @click="!isCameraActive ? startCamera() : capturePhoto()"
      id="photo_btn"
      class="w-100"
      color="#636C73"
      flat
      height="44"
      variant="outlined"
    >
      <v-icon class="mr-2">mdi-camera</v-icon>
      <p v-if="!isCameraActive" class="text-body-1 mb-0">Add Photo</p>
      <p v-else class="text-body-1 mb-0">Take Photo</p>
    </v-btn>
    <canvas ref="canvas" style="display: none"></canvas>
  </v-sheet>
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
