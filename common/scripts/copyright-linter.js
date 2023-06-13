const fs = require('fs');
const path = require('path')
const child_process = require('child_process')

console.log(child_process.execSync("git diff --name-only main")
    .toString())

const filePaths = process.argv.reduce((result, record) => {
    if (result) {

    }
}, false)


