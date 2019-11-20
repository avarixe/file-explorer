<template>
  <div>
    <h1>Home</h1>

    <v-btn to="/tags">
      Tags
    </v-btn>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class HomePage extends Vue {
  }
</script>
