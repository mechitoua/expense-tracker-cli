import { getSummary } from './services/summaryExpense.ts'
import { addExpense } from './services/addExpense.ts'
import { Command } from 'https://deno.land/x/cliffy@v0.25.7/command/mod.ts'
import { listExpenses } from './services/listExpense.ts'
import { deleteExpense } from './services/deleteExpense.ts'

const program = new Command()

// add expensees command
program
  .command('add')
  .description('Add a new expense')
  .option('--description <description>', 'Description of the expense')
  .option('--amount <amount>', 'Amount of the expense')
  .action((options) => {
    const { description, amount } = options
    if (description && amount) {
      addExpense(description, amount)
    } else {
      console.error('Both description and amount must be provided.')
    }
  })

// list expenses command
program
  .command('list')
  .description('List all expenses')
  .action(() => {
    listExpenses()
  })

// delete expenses command
program
  .command('delete')
  .description('Delete an expense')
  .option('--id <id:number>', 'ID of the expense to delete')
  .action(async (options) => {
    const { id } = options
    if (id?.toString()) {
      try {
        await deleteExpense(id.toString())
        console.log('Expense deleted successfully')
      } catch (error) {
        console.error((error as Error).message)
      }
    } else {
      console.error('Please provide an expense ID to delete')
    }
})

// summary expenses command
program
.command('summary')
.description('Show expense summary')
.option('--month <month:number>', 'Month number (1-12) to filter expenses')
.action(async (options) => {
    const { month } = options
    try {
    const summary = await getSummary(month)
    console.log(summary)
    } catch (error) {
    console.error((error as Error).message)
    }
})

await program.parse(Deno.args)
