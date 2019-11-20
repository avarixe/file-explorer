<template>
  <dialog-form
    v-model="dialog"
    :title="title"
    :color="color"
    :submit="submit"
  >
    <template #activator="{ on }">
      <slot :on="on" />
    </template>

    <template #form>
      <v-col cols="12">
        <v-text-field
          v-model="tag.name"
          label="Name"
          item-text="text"
          item-value="value"
        />
      </v-col>
      <v-col cols="12">
        <v-select
          v-model="tag.color"
          label="Color"
          :items="colors"
          item-text="text"
          item-value="value"
        >
          <template #selection="{ item }">
            <v-icon
              :color="item.value"
              left
            >
              mdi-circle
            </v-icon>
            {{ item.text }}
          </template>
          <template #item="{ item }">
            <v-icon
              :color="item.value"
              left
            >
              mdi-circle
            </v-icon>
            {{ item.text }}
          </template>
        </v-select>
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="tag.description"
          label="Description"
          filled
        />
      </v-col>
    </template>
  </dialog-form>
</template>

<script>
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
  import Tag from '@/models/Tag'
  import DialogForm from '@/helpers/DialogForm'

  @Component({
    components: {
      DialogForm
    }
  })
  export default class TagForm extends Vue {
    @Prop(Object) record
    @Prop(String) color

    dialog = false
    tag = {
      name: null,
      color: null,
      description: null
    }

    colors = [
      { value: 'red',         text: 'Red' },
      { value: 'pink',        text: 'Pink' },
      { value: 'purple',      text: 'Purple' },
      { value: 'deep-purple', text: 'Deep Purple' },
      { value: 'indigo',      text: 'Indigo' },
      { value: 'blue',        text: 'Blue' },
      { value: 'light-blue',  text: 'Light Blue' },
      { value: 'cyan',        text: 'Cyan' },
      { value: 'teal',        text: 'Teal' },
      { value: 'green',       text: 'Green' },
      { value: 'light-green', text: 'Light Green' },
      { value: 'lime',        text: 'Lime' },
      { value: 'yellow',      text: 'Yellow' },
      { value: 'amber',       text: 'Amber' },
      { value: 'orange',      text: 'Orange' },
      { value: 'deep-orange', text: 'Deep Orange' },
      { value: 'brown',       text: 'Brown' },
      { value: 'blue-grey',   text: 'Blue Grey' },
      { value: 'grey',        text: 'Grey' },
      { value: 'black',       text: 'Black' },
    ]

    get title () {
      return 'New Tag'
    }

    @Watch('dialog')
    setRecord (val) {
      if (val && this.record) {
        this.tag = {
          id: this.record.id,
          name: this.record.name,
          color: this.record.color,
          description: this.record.description
        }
      }
    }

    async submit () {
      if (!this.tag.id) {
        const lastTag = Tag.query().orderBy('id').last()
        this.tag.id = lastTag ? lastTag.id + 1 : 1
      }

      Tag.insert({ data: this.tag })
    }
  }
</script>
