# tiri

displays list of files in tree format

## Install

```
$ npm install -g tiri
```

## Usage

Pipe list of files to tiri to display them in a merged tree format. For example
for code reviews `git diff` can be piped:

```
$ git diff master... | tiri
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
