const { program } = require('commander')

program
  .name('myclijs')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0')

program
  .command('say')
  .description('Say something')
  .argument('<word>', 'A word to say')
  .option('-u, --uppercase', 'Say it uppercase')
  .option('-l, --lowercase', 'Say it lowercase')
  .option('-t, --twice', 'Say it twice')
  .option('-p, --prefix <prefix>', 'Prefix the word')

  .action((word, options) => {
    if (options.uppercase) {
      word = word.toUpperCase()
    }

    if (options.lowercase) {
      word = word.toLowerCase()
    }

    if (options.twice) {
      word = word + ' ' + word
    }

    if (options.prefix) {
      word = options.prefix + ' ' + word
    }

    console.log(word)
  })

program
  .command('multiply')
  .description('Multiply two numbers')
  .argument('<num1>', 'The first number')
  .argument('<num2>', 'The second number')
  .action((num1, num2) => {
    console.log(num1 * num2)
  })

program
  .command('add-n-numbers')
  .description('add n numbers')
  .argument('<numbers...>')
  .action(numbers => {
    let result = 0
    numbers.forEach(number => {
      result += Number(number)
    })
    console.log(result)
  })

program.addHelpText(
  'after',
  `
  
  Example call:
    $ myclijs say hello`
)
program.showHelpAfterError('(Run: myclijs --help for more information)')

program.parse(process.argv)
