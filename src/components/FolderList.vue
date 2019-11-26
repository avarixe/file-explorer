<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :mobile-breakpoint="0"
    :search="search"
    @click:row="openFolder"
  >
    <template #body.prepend>
      <tr>
        <td>
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            hide-details
            dense
          />
        </td>
        <td>
          <v-autocomplete
            v-model="tags"
            :items="allTags"
            label="Tags"
            prepend-inner-icon="mdi-tag"
            hide-details
            multiple
            dense
          >
            <template #selection="{ item }">
              <v-chip
                :color="item.color"
                small
                dark
                close
                @click:close="removeTag(item)"
              >
                {{ item.name }}
              </v-chip>
            </template>
            <template #item="{ item }">
              <v-icon
                :color="item.color"
                left
              >
                mdi-circle
              </v-icon>
              {{ item.name }}
            </template>
          </v-autocomplete>
        </td>
      </tr>
    </template>
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
  import Folder from '@/models/Folder'
  import Tag from '@/models/Tag'

  const path = require('path')

  @Component
  export default class FolderList extends Vue {
    @Prop(Array) folders
    @State path
    @Action('SET_PATH') setPath

    search = null
    tags = []
    headers = [
      { text: 'Name', value: 'fileName' },
      { text: 'Tags', value: 'tags', sortable: false }
    ]

    get items () {
      return [
        { fileName: '..' },
        ...this.folders
      ]
    }

    get allTags () {
      return Tag.all()
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

      this.search = null
      this.tags = []
    }

    folderTags (dir) {
      const folder = Folder
        .query()
        .where('name', dir.rootDir + path.sep + dir.fileName)
        .first()
      return folder
        ? Tag.query().where(tag => folder.tags.indexOf(tag.name) > -1).all()
        : []
    }

    removeTag (tag) {
      const index = this.tags.indexOf(tag)
      if (index >= 0) {
        this.tags.splice(index, 1)
      }
    }
  }
</script>
