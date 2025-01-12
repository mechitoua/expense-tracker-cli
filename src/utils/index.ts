import { ensureDir, exists } from 'https://deno.land/std@0.224.0/fs/mod.ts'
import { Expense } from '../models/expense.ts'

const dataFolder = 'data/'
// create an array to store the expenses
const expenses: Expense[] = []

export async function loadExpencesFromCSV() {
  // Ensure data folder exists and create the file if it doesn't
  await setupDataFolder()
  const fileExists = await exists(`${dataFolder}/expenses.csv`)
  if (!fileExists) {
    await Deno.writeTextFile(`${dataFolder}/expenses.csv`, '')
  }
  const csvContent: string = await Deno.readTextFile(`${dataFolder}/expenses.csv`)
  const lines: string[] = csvContent.split('\n')
  lines.forEach((line: string) => {
    if (line.trim() === '') return // Skip empty lines
    const [id, description, amount, date] = line.split(',')
    if (!id || !description || isNaN(parseFloat(amount)) || !date) {
      console.warn(`Skipping invalid line: ${line}`) // Log invalid lines
      return
    }
    const expense: Expense = {
      id,
      description,
      amount: parseFloat(amount),
      date
    }
    expenses.push(expense)
  })
  return expenses
}

async function setupDataFolder() {
  await ensureDir(dataFolder)

  if (!(await exists(`${dataFolder}/expenses.csv`))) {
    await Deno.writeTextFile(`${dataFolder}/expenses.csv`, '')
  }
}

export async function saveExpencesToCSV() {
  await setupDataFolder()
  const csvContent = expenses
    .map((expense) => `${expense.id},${expense.description},${expense.amount},${expense.date}`)
    .join('\n')
  await Deno.writeTextFile(`${dataFolder}/expenses.csv`, csvContent)
}

export async function listExpenses() {
  const expenses = await loadExpencesFromCSV()
  console.log('Expenses:')
  expenses.forEach((expense) => {
    console.log(
      `ID: ${expense.id}, Description: ${expense.description}, Amount: ${expense.amount}, Date: ${expense.date}`
    )
  })
}
