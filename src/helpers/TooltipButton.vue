<template>
  <v-tooltip
    :color="color"
    bottom
  >
    <template #activator="{ on: tooltip }">
      <v-btn
        icon
        :to="to"
        v-on="on ? { ...on, ...tooltip } : tooltip"
        @click="$emit('click')"
      >
        <v-icon
          :color="color"
          :dark="dark"
          v-text="icon"
        />
      </v-btn>
    </template>
    {{ label }}
  </v-tooltip>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class TooltipButton extends Vue {
    @Prop(String) label
    @Prop(String) icon
    @Prop(String) color
    @Prop(Boolean) dark
    @Prop(Object) to
    @Prop() on
  }
</script>
