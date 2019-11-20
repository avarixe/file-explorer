<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-text-field
        v-model="dir"
        prepend-icon="mdi-arrow-right"
        hide-details
      />
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator'

  const fs = require('fs')

  const homedir = require('os').homedir()
  console.log(fs.readdirSync(homedir))

  @Component
  export default class App extends Vue {
    dir = homedir
  }
</script>
