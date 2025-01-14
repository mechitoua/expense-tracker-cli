import { Expense } from '../models/expense.ts'
import { loadExpencesFromCSV } from '../utils/index.ts'

export async function listExpenses() {
  const expenses = await loadExpencesFromCSV()
  console.log(`ID  Date        Description Amount`)
  formatExpenses(expenses)
}

export function formatExpenses(expenses: Expense[]) {
  expenses.forEach((expense) => {
    const formattedDate = new Date(expense.date).toISOString().split('T')[0] // Format date
    const formattedAmount = `$${expense.amount.toFixed(2)}` // Format amount
    console.log(`${expense.id}   ${formattedDate}  ${expense.description} ${formattedAmount}`)
  })
}
