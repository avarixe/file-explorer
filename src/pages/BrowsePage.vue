<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-toolbar
          color="primary"
          dark
        >
          <v-text-field
            prepend-icon="mdi-arrow-right"
            hide-details
            :value="path"
            @input="setPath"
          />
        </v-toolbar>
      </v-col>
    </v-row>

    <template v-if="mode === 'grid'">
      <v-row dense>
        <v-col
          cols="12"
          sm="4"
          md="3"
          lg="2"
        >
          <v-list-item
            style="height: 100%"
            @click="goBack"
          >
            <v-list-item-avatar>
              <v-icon>mdi-arrow-up</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>..</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col
          v-for="(folder, i) in folders"
          :key="i"
          cols="12"
          sm="4"
          md="3"
          lg="2"
        >
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-list-item v-on="on" @click="openFolder(folder)">
                <v-list-item-avatar>
                  <v-icon>mdi-folder</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ folder.fileName }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      v-for="tag in folderTags(folder)"
                      :key="tag.id"
                      :color="tag.color"
                      x-small
                      dark
                    >
                      {{ tag.name }}
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            {{ folder.fileName }}
          </v-tooltip>
        </v-col>
      </v-row>
    </template>
    <template v-else-if="mode === 'list'">
      <folder-list :folders="folders" />
    </template>
  </v-container>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator'
  import { State, Action } from 'vuex-class'
  import walkFolders from '@/plugins/walkFolders'
  import FolderTag from '@/models/FolderTag'
  import FolderList from '@/components/FolderList'

  const path = require('path')

  @Component({
    components: {
      FolderList
    }
  })
  export default class BrowsePage extends Vue {
    @State mode
    @State path
    @Action('SET_PATH') setPath

    get folders () {
      let folders = []

      if (!this.path || typeof this.path !== 'string') {
        return folders
      }

      for (const fileInfo of walkFolders(this.path)) {
        if ('error' in fileInfo) {
          console.error(`Error: ${fileInfo.rootDir} - ${fileInfo.error}`)
          continue
        }

        if (!fileInfo.isDir) {
          continue
        }

        folders.push(fileInfo)
      }

      return folders
    }

    goBack () {
      let directories = this.path.split(path.sep)
      const currentDir = directories.pop()
      const newPath = directories.join(path.sep)

      if (currentDir.length > 0 && newPath.length > 0) {
        this.setPath(newPath)
      }
    }

    openFolder (folder) {
      this.setPath(folder.rootDir + path.sep + folder.fileName)
    }

    folderTags (folder) {
      return FolderTag
        .query()
        .with('tag')
        .where('name', folder.rootDir + path.sep + folder.fileName)
        .all()
        .map(folder => folder.tag)
    }
  }
</script>

<style scoped>
  .v-list-item__subtitle {
    white-space: normal;
  }
</style>
