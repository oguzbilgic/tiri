#!/usr/bin/env node

// https://stackoverflow.com/a/46705010/96725
const { r, g, b, w, c, m, y, k } = [
  ['r', 1], ['g', 2], ['b', 4], ['w', 7],
  ['c', 6], ['m', 5], ['y', 3], ['k', 0],
].reduce((cols, col) => ({
  ...cols,  [col[0]]: f => `\x1b[3${col[1]}m${f}\x1b[0m`
}), {})

const stdin = process.openStdin();

let files = "";

stdin.on('data', (chunk) => {
  files += chunk
})

stdin.on('end', () => {
  const lines = files.toString().split('\n').filter(l => l)

  const root = new Node('.');

  root.addMultiple(lines)
  root.merge()
  root.print()
});

class Node { 
  constructor(name) {
    this.name = name
    this.children = [] 
  }

  addMultiple(paths) {
    paths.forEach(this.add.bind(this))
  }

  add(path) {
    if (!path) {
      return 
    }

    const parts = path.split('/')
    let found = false

    this.children.forEach(child => {
      if (child.name == parts[0]) {
        child.add(parts.slice(1).join('/'))
        found = true
      }
    })

    if (!found) {
      const newNode = new Node(parts[0])

      this.children.push(newNode)
      newNode.add(parts.slice(1).join('/'))
    }
  }

  merge() {
    this.children.map(child => child.merge())

    if (this.children.length == 1) {
      this.name += '/' + this.children[0].name

      this.children = this.children[0].children
    }
  }

  print(levels = [], last = true) {
    let line = levels.map(level => level ? y('│ ') : '  ').join('')

    if (last) {
      line += y('└─ ')
    } else {
      line += y('├─ ')
    }

    if (this.children.length > 0) {
      line += y(this.name) + y('/')
    } else {
      line += b(this.name)
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

