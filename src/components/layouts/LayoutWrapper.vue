<template>
  <div class="d-flex justify-center align-top pt-16 h-100 w-100 app-background">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.app-background {
  background-color: #f5f5f5;
  min-width: 300px;
}
</style>
