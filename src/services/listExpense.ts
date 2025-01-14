import { Expense } from '../models/expense.ts'
import { loadExpencesFromCSV } from '../utils/index.ts'

const COLUMN_WIDTHS = {
  id: 4,
  date: 12,
  description: 30,
  amount: 10
}

function padRight(str: string, width: number): string {
  return str.padEnd(width, ' ')
}

function padLeft(str: string, width: number): string {
  return str.padStart(width, ' ')
}

function truncate(str: string, width: number): string {
  if (str.length <= width) return str
  return str.slice(0, width - 3) + '...'
}

export async function listExpenses() {
  const expenses = await loadExpencesFromCSV()
  const header = [
    padRight('ID', COLUMN_WIDTHS.id),
    padRight('Date', COLUMN_WIDTHS.date),
    padRight('Description', COLUMN_WIDTHS.description),
    padLeft('Amount', COLUMN_WIDTHS.amount)
  ].join(' ')
  console.log(header)
  formatExpenses(expenses)
}

export function formatExpenses(expenses: Expense[]) {
  expenses.forEach((expense) => {
    const formattedDate = new Date(expense.date).toISOString().split('T')[0]
    const formattedAmount = `$${expense.amount.toFixed(2)}`
    const line = [
      padRight(expense.id.toString(), COLUMN_WIDTHS.id),
      padRight(formattedDate, COLUMN_WIDTHS.date),
      padRight(truncate(expense.description, COLUMN_WIDTHS.description), COLUMN_WIDTHS.description),
      padLeft(formattedAmount, COLUMN_WIDTHS.amount)
    ].join(' ')
    console.log(line)
  })
}
