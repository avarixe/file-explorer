<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn @click="addTag">
          <v-icon left>mdi-plus-circle</v-icon>
          Tag
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="tags"
        >
          <template #item.color="{ item }">
            <v-avatar
              :color="item.color"
              size="36"
            >
              {{ item.color }}
            </v-avatar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Tag from '@/models/Tag'

  export default {
    data: () => ({
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Color', value: 'color', align: 'center' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions', align: 'right' }
      ]
    }),
    computed: {
      tags () {
        return Tag.all()
      }
    },
    mounted () {
      console.log(this.tags)
    },
    methods: {
      addTag () {
        Tag.insert({
          data: { id: 1, name: 'Tag', description: 'New tag!', color: '#333' }
        })
      }
    }
  }
</script>
