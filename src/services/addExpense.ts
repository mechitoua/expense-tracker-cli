import { green, yellow } from 'https://deno.land/std@0.224.0/fmt/colors.ts'
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
    console.log(yellow(`Expense already exists!`))
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
  console.log(green(`Expense added successfully! (ID: ${newId})`))
}
