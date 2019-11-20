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
  import Tag from '@/models/Tag'
  import DialogForm from '@/helpers/DialogForm'

  export default {
    data: () => ({
      dialog: false,
      tag: {
        name: null,
        color: null,
        description: null
      }
    }),
    computed: {
      title () {
        return 'New Tag'
      }
    },
    methods: {
      async submit () {
        const lastTag = Tag.query().orderBy('id').last()
        const id = lastTag ? lastTag.id + 1 : 1

        Tag.insert({
          data: { id, ...tag }
        })
      }
    }
  }
</script>
