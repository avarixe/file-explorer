<template>
  <v-app>
    <v-navigation-drawer
      permanent
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            File Explorer
          </v-list-item-title>
          <v-list-item-subtitle>
            v{{ version }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list nav>
        <v-list-item
          to="/browse"
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-folder-open</v-icon>
          </v-list-item-action>
          <v-list-item-title>Browse</v-list-item-title>
        </v-list-item>

        <v-list-item
          to="/tags"
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-tag</v-icon>
          </v-list-item-action>
          <v-list-item-title>Tags</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator'
  import pkg from '../package.json'

  @Component
  export default class App extends Vue {
    version = pkg.version
    drawer = false
    responsive = false

    mounted () {
      this.updateResponsiveState()
      window.addEventListener('resize', this.updateResponsiveState)
    }

    beforeDestroy () {
      window.removeEventListener('resize', this.updateResponsiveState)
    }

    updateResponsiveState () {
      this.responsive = window.innerWidth < 991
    }
  }
</script>
