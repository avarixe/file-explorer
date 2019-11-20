<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <tag-form>
          <template #default="{ on }">
            <v-btn v-on="on">
              <v-icon left>mdi-plus-circle</v-icon>
              Tag
            </v-btn>
          </template>
        </tag-form>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="tags"
        >
          <template #item.name="{ item }">
            <v-chip
              :color="item.color"
              dark
            >
              {{ item.name }}
            </v-chip>
          </template>
          <template #item.actions="{ item }">
            <tag-form
              :record="item"
              color="orange"
            >
              <template #default="{ on }">
                <v-btn
                  v-on="on"
                  icon
                >
                  <v-icon color="orange">mdi-pencil</v-icon>
                </v-btn>
              </template>
            </tag-form>
            <v-btn
              icon
              @click="deleteTag(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator'
  import Tag from '@/models/Tag'
  import TagForm from '@/components/TagForm'

  @Component({
    components: {
      TagForm
    }
  })
  export default class TagsPage extends Vue {
    headers = [
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description' },
      { text: 'Actions', value: 'actions', align: 'right' }
    ]

    get tags () {
      return Tag.all()
    }

    mounted () {
      console.log(this.tags)
    }

    deleteTag (tag) {
      Tag.delete(tag.id)
    }
  }
</script>
