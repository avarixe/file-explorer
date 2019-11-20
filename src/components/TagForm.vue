<template>
  <dialog-form
    v-model="dialog"
    :title="title"
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
        />
      </v-col>
      <v-col cols="12">
        <v-color-picker
          v-model="tag.color"
          label="Color"
        />
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
  import { Vue, Component } from 'vue-property-decorator'
  import Tag from '@/models/Tag'
  import DialogForm from '@/helpers/DialogForm'

  @Component
  export default class TagForm extends Vue {
    dialog = false
    tag = {
      name: null,
      color: null,
      description: null
    }

    get title () {
      return 'New Tag'
    }

    async submit () {
      const lastTag = Tag.query().orderBy('id').last()
      const id = lastTag ? lastTag.id + 1 : 1

      Tag.insert({
        data: { id, ...tag }
      })
    }
  }
</script>
