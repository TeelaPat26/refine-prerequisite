#!/usr/bin/env node
import { Command } from 'commander'
import { exec } from 'shelljs'
const program = new Command()

// <type> = 'login' | 'auth'

program
  .command('add <type>')
  .description('Add a new component')
  .action(type => {
    if (type === 'login') {
      exec('npx copy-files-from-to --config lib/add-login/copy-login.json')
    } else {
      throw new Error(`Unknown type: ${type}`)
    }
  })

program.parse(process.argv)
