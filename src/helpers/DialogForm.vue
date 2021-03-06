<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    :max-width="fullWidth ? '' : '500px'"
  >
    <template #activator="{ on }">
      <slot
        name="activator"
        :on="on"
      />
    </template>

    <v-form
      ref="form"
      v-model="valid"
      style="width:100%"
      @submit.prevent="submitForm"
    >
      <v-card>
        <v-toolbar
          :class="formColor"
          dense
        >
          <slot name="header">
            <v-toolbar-title>
              <v-icon left>{{ titleIcon }}</v-icon>
              {{ title }}
            </v-toolbar-title>
          </slot>
        </v-toolbar>

        <v-divider />

        <v-card-text :key="key">
          <v-row dense>
            <slot name="form" />
          </v-row>
        </v-card-text>

        <v-alert
          v-model="formError"
          type="error"
          dismissible
          tile
          v-text="errorMessage"
        />

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="tertiary"
            text
            large
            @click="dialog = false"
          >
            Cancel
          </v-btn>

          <slot name="additional-actions" />

          <v-btn
            type="submit"
            :disabled="!valid"
            :color="buttonColor"
            text
            large
            :loading="loading"
            @click="loading = true"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class DialogForm extends Vue {
    @Prop({ type: Boolean, required: true }) value
    @Prop({ type: Function, required: true }) submit
    @Prop(Function) submitCb
    @Prop(String) title
    @Prop(String) titleIcon
    @Prop(String) color
    @Prop(Boolean) fullWidth

    dialog = null
    key = 0
    valid = false
    loading = false
    errorMessage = ''
    formError = false

    get buttonColor () {
      return this.color ? this.color + ' darken-2' : 'primary'
    }

    get formColor () {
      return this.color ? this.color + ' accent-2' : null
    }

    mounted () {
      this.dialog = this.value
    }

    @Watch('dialog')
    emitValue (val) {
      this.$emit('input', val)

      if (!val && this.$refs.form) {
        this.resetForm()
      }
    }

    async resetForm () {
      this.key++
      this.$refs.form.reset()
    }

    async submitForm () {
      if (this.$refs.form.validate()) {
        try {
          await this.submit()
          this.dialog = false
          this.submitCb && this.submitCb()
        } catch (e) {
          console.log(e)
          console.log(e.message)
          this.errorMessage = e.message
          this.formError = true
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
