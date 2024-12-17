#!/usr/bin/env node
const { Command } = require('commander')
const { exec } = require('shelljs')
const program = new Command()

const VALID_TYPES = [
  'login',
  'env',
  'axios',
  'auth-provider',
  'access-token',
  'refresh-token',
  'api-auth',
]

program
  .command('add <type>')
  .description('Add a new component')
  .action(type => {
    if (!VALID_TYPES.includes(type)) {
      throw new Error(
        `Invalid type: "${type}"\nAvailable types: ${VALID_TYPES.join(' | ')}`
      )
    }

    console.log(
      '\x1b[33m%s\x1b[0m',
      'Important: Make sure you have installed/updated @kodkool/refine-prerequisite to the latest version before running this command.'
    )
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Run: npm install @kodkool/refine-prerequisite@latest\n'
    )

    const configMap = {
      login: 'copy-login.json',
      env: 'copy-env.json',
      axios: 'copy-axios.json',
      'auth-provider': 'copy-auth-provider.json',
      'access-token': 'copy-access-token.json',
      'refresh-token': 'copy-refresh-token.json',
      'api-auth': 'copy-api-auth.json',
    }

    exec(
      `npx copy-files-from-to --config node_modules/@kodkool/refine-prerequisite/lib/add/copy-config/${configMap[type]}`
    )
  })

program.parse(process.argv)
