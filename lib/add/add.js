#!/usr/bin/env node
const { Command } = require('commander')
const { exec } = require('shelljs')
const program = new Command()

// <type> = 'login' | 'auth'

program
  .command('add <type>')
  .description('Add a new component')
  .action(type => {
    if (type === 'login') {
      exec(
        'npx copy-files-from-to --config node_modules/@kodkool/refine-prerequisite/lib/add/copy-config/copy-login.json'
      )
    } else {
      throw new Error(`Unknown type: ${type}`)
    }
  })

program.parse(process.argv)
