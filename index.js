
// https://stackoverflow.com/a/46705010/96725
const { r, g, b, w, c, m, y, k } = [
  ['r', 1], ['g', 2], ['b', 4], ['w', 7],
  ['c', 6], ['m', 5], ['y', 3], ['k', 0],
].reduce((cols, col) => ({
  ...cols,  [col[0]]: f => `\x1b[3${col[1]}m${f}\x1b[0m`
}), {})

class Node { 
  constructor(name, status) {
    this.name = name
    this.children = [] 
    this.status = status
  }

  addMultiple(paths) {
    paths.forEach(this.add.bind(this))
  }

  add(line, status) {
    let found = false
    let parts;

    if (!line) {
      return 
    }

    if (line.match(/\S+/g).length == 2) {
      // line has status
      status = line.match(/\S+/g)[0]
      parts = line.match(/\S+/g)[1].split('/')
    } else {
      // Status stays the same
      parts = line.split('/')
    }

    this.children.forEach(child => {
      if (child.name == parts[0]) {
        child.add(parts.slice(1).join('/'), status)
        found = true
      }
    })

    if (!found) {
      const newNode = new Node(parts[0], status)

      this.children.push(newNode)
      newNode.add(parts.slice(1).join('/'), status)
    }
  }

  merge() {
    this.children.map(child => child.merge())

    if (this.children.length == 1) {
      this.name += '/' + this.children[0].name

      this.status = this.children[0].status
      this.children = this.children[0].children
    }
  }

  print(levels = [], last = true) {
    let line = levels.map(level => level ? b('│ ') : '  ').join('')

    if (last) {
      line += b('└─ ')
    } else {
      line += b('├─ ')
    }

    if (this.children.length > 0) {
      line += b(this.name) + b('/')
    } else {
      switch (this.status) {
        case 'A':
          line += g(this.name)
          break;
        case 'M':
          line += y(this.name)
          break;
        case 'D':
          line += r(this.name)
          break;
        default:
          line += y(this.name)
          break;
      }
    }

    console.log(line)

    if (this.children.length > 0) {
      this.children.forEach((child, i) => {
        const isLast = (i+1 == this.children.length)

        child.print([...levels, !last], isLast)
      })
    }
  }
}

module.exports = Node
