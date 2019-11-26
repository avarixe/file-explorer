import { Model } from '@vuex-orm/core'

export default class Folder extends Model {
  static get entity () {
    return 'folders'
  }

  static fields () {
    return {
      id: this.uid(),
      name: this.attr(''),
      tags: this.attr([])
    }
  }
}
