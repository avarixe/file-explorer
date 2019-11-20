<template>
  <v-data-table
    :headers="headers"
    :items="items"
    @click:row="openFolder"
  >
    <template #item.fileName="{ item }">
      <v-icon left>
        mdi-{{ item.fileName === '..' ? 'arrow-up' : 'folder' }}
      </v-icon>
      {{ item.fileName }}
    </template>
    <template #item.tags="{ item }">
      <v-chip
        v-for="tag in folderTags(item)"
        :key="tag.id"
        :color="tag.color"
        x-small
        dark
      >
        {{ tag.name }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import { State, Action } from 'vuex-class'
  import FolderTag from '@/models/FolderTag'

  const path = require('path')

  @Component
  export default class FolderList extends Vue {
    @Prop(Array) folders
    @State path
    @Action('SET_PATH') setPath

    headers = [
      { text: 'Name', value: 'fileName' },
      { text: 'Tags', value: 'tags' }
    ]

    get items () {
      return [
        { fileName: '..' },
        ...this.folders
      ]
    }

    openFolder (folder) {
      if (folder.fileName === '..') {
        let directories = this.path.split(path.sep)
        const currentDir = directories.pop()
        const newPath = directories.join(path.sep)

        if (currentDir.length > 0 && newPath.length > 0) {
          this.setPath(newPath)
        }
      } else {
        this.setPath(folder.rootDir + path.sep + folder.fileName)
      }
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
