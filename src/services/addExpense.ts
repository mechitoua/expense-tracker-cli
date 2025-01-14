import { Expense } from '../models/expense.ts'
import { loadExpencesFromCSV, saveExpencesToCSV } from '../utils/index.ts'

const expenses = await loadExpencesFromCSV()
const getMaxId = () => {
  return expenses.reduce((maxId, expense) => Math.max(maxId, parseInt(expense.id)), 0)
}

const expenseExists = (description: string, amount: string) => {
  return expenses.some(
    (expense) => expense.description === description && expense.amount === parseFloat(amount)
  )
}

export async function addExpense(description: string, amount: string) {
  if (expenseExists(description, amount)) {
    console.log(`Expense already exists!`)
    return
  }

  const newId = getMaxId() + 1
  const expense: Expense = {
    id: String(newId),
    description,
    amount: parseFloat(amount),
    date: new Date().toISOString()
  }
  expenses.push(expense)
  await saveExpencesToCSV(expenses)
  console.log(`Expense added successfully!`)
}
