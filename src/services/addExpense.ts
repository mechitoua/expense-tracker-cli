import { Expense } from '../models/expense.ts'
import { loadExpencesFromCSV } from '../utils/index.ts'
import { saveExpencesToCSV } from '../utils/index.ts'

let expenses: Expense[]
const getMaxId = () => {
  return expenses.reduce((maxId, expense) => Math.max(maxId, parseInt(expense.id)), 0)
}

export async function addExpense(description: string, amount: string) {
  const newId = getMaxId() + 1
  const expense: Expense = {
    id: String(newId),
    description,
    amount: parseFloat(amount),
    date: new Date().toISOString()
  }
  expenses.push(expense)
  await saveExpencesToCSV()
  console.log(`Expense added successfully!`)
}
