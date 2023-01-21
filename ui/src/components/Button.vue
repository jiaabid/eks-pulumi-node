<template>
  <v-container>
    <v-btn color="secondary" elevation="2" x-large>{{ name }}</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    name: String,
  },
};
</script>
