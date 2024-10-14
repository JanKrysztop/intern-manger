<template>
  <v-app>
    <v-main class="app-background">
      <LayoutWrapper>
        <router-view />
      </LayoutWrapper>
    </v-main>
  </v-app>
</template>

<style>
.app-background {
  background-color: #f5f5f5;
}
</style>
