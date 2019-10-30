#!/usr/bin/env node

const Node = require('../index.js')

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
