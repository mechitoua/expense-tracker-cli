import { addExpense } from './services/addExpense.ts'
import { Command } from 'https://deno.land/x/cliffy@v0.25.7/command/mod.ts'
import { loadExpencesFromCSV } from './utils/index.ts'

const program = new Command()

const expenses = await loadExpencesFromCSV()
// add expensees command
program
  .command('add')
  .description('Add a new expense')
  .option('--description <description>', 'Description of the expense')
  .option('--amount <amount>', 'Amount of the expense')
  .action((options) => {
    const { description, amount } = options
    if (description && amount) {
      addExpense(description, amount);
    } else {
      console.error("Both description and amount must be provided.");
    }
  })

// list expenses command
program
  .command('list')
  .description('List all expenses')
  .action(() => {
    expenses.forEach((expense) => {
      console.log(
        `ID: ${expense.id}, Description: ${expense.description}, Amount: ${expense.amount}, Date: ${expense.date}`
      )
    })
  })

await program.parse(Deno.args)
