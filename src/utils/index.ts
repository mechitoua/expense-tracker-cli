import { ensureDir, exists } from 'https://deno.land/std@0.224.0/fs/mod.ts'
import { Expense } from '../models/expense.ts'

const dataFolder = 'data/'

export async function loadExpencesFromCSV() {
  await setupDataFolder()
  try {
    const fileExists = await exists(`${dataFolder}/expenses.csv`, { isReadable: true })
    if (!fileExists) await Deno.writeTextFile(`${dataFolder}/expenses.csv`, '')
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error
    }
  }
  const csvContent: string = await Deno.readTextFile(`${dataFolder}/expenses.csv`)
  const lines: string[] = csvContent.split('\n')
  const expenses: Expense[] = [] // Move expenses array inside the function
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
  try {
    await ensureDir(dataFolder)
  } catch (error) {
    if (!(error instanceof Deno.errors.AlreadyExists)) {
      throw error
    }
  }

  if (!(await exists(`${dataFolder}/expenses.csv`, { isReadable: true }))) {
    await Deno.writeTextFile(`${dataFolder}/expenses.csv`, '')
  }
}

export async function saveExpencesToCSV(expenses: Expense[]) {
  await setupDataFolder()
  const csvContent = expenses
    .map((expense) => `${expense.id},${expense.description},${expense.amount},${expense.date}`)
    .join('\n')
  await Deno.writeTextFile(`${dataFolder}/expenses.csv`, csvContent)
}
