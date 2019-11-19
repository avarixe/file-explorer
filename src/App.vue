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
    </v-content>
  </v-app>
</template>

<script>
  const fs = require('fs')

  const homedir = require('os').homedir()
  console.log(fs.readdirSync(homedir))

  export default {
    name: 'App',

    components: {
    },

    data: () => ({
      dir: homedir
    })
  }
</script>
