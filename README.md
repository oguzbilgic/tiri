# tiri

displays list of files in tree format

## Install

```
$ npm install -g tiri
```

## Usage

Pipe list of files to tiri to display them in a merged tree format. For example
for code reviews `git diff` can be piped to see the list of files updated in a
given feature branch since `master`:

```
$ git diff master... --name-only | tiri
└─ ./
  ├─ package.json
  └─ src/main/
    ├─ java/com/components/ContactsController.java
    └─ javascript/
      ├─ react/components/
      │ ├─ checkbox.js
      │ └─ text-input.js
      └─ features/dashboard/
        └─ react/
          ├─ ListIndex.js
          └─ ListModal.js
```

And if you want tiri to use green, yellow and red colors for different statuses
(added, modified and deleted); you can use the `--name-status` option for git.

```
$ git diff master... --name-status | tiri
```
