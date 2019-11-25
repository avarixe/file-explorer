import { Model } from '@vuex-orm/core'
import Tag from './Tag'

export default class FolderTag extends Model {
  static get entity () {
    return 'folderTags'
  }

  static fields () {
    return {
      id: this.uid(),
      name: this.attr(''),
      tag_id: this.attr(''),

      tag: this.belongsTo(Tag, 'tag_id')
    }
  }
}
