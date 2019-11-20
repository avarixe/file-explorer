<template>
  <v-container>
    <v-toolbar
      color="primary"
      dark
    >
      <v-text-field
        v-model="dir"
        prepend-icon="mdi-arrow-right"
        hide-details
      />
    </v-toolbar>
  </v-container>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator'

  const fs = require('fs')

  const homedir = require('os').homedir()
  console.log(fs.readdirSync(homedir))

  @Component
  export default class HomePage extends Vue {
    dir = homedir
  }
</script>
