import { Model } from '@vuex-orm/core'
import FolderTag from './FolderTag'

export default class Tag extends Model {
  static get entity () {
    return 'tags'
  }

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(''),
      color: this.attr(''),
      description: this.attr(''),

      folders: this.hasMany(FolderTag, 'tag_id')
    }
  }
}
