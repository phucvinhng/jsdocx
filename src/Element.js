import { toXML as convertToXml } from 'to-xml'

export default class {
  constructor (src, contenthook) {
    this.src = src || {}
    this.contents = []
    this.contentHook = contenthook || null
    if (
      this.contentHook &&
      (['.', '['].indexOf(this.contentHook[0]) === -1)
    ) {
      throw TypeError('First char of content hook should be "." or "["')
    }
  }

  finalize (contents) {
    // Do nothing.
  }

  toJson () {
    let src = Object.assign({}, this.src)
    let contents = this.contents.slice(0)

    this.finalize(contents)

    if (this.contentHook) {
      let hook = eval('src' + this.contentHook)
      contents.forEach((c) => {
        if (c && c.toJson) {
          if (hook instanceof Array) {
            hook.push(c.toJson())
          }
          else {
            Object.assign(hook, c.toJson())
          }
        }
      })
    }

    return JSON.parse(JSON.stringify(src))
  }

  toXml () {
    return convertToXml(this.toJson())
  }
}
