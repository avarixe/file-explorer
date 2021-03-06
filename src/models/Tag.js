import { Model } from '@vuex-orm/core'

export default class Tag extends Model {
  static get entity () {
    return 'tags'
  }

  static fields () {
    return {
      id: this.uid(),
      name: this.attr(''),
      color: this.attr(''),
      description: this.attr('')
    }
  }
}
