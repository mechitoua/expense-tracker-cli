import { red, yellow } from 'https://deno.land/std@0.224.0/fmt/colors.ts'
import { Expense } from '../models/expense.ts'
import { loadExpencesFromCSV } from '../utils/index.ts'

export async function getSummary(month?: number): Promise<string> {
  try {
    const expenses = await loadExpencesFromCSV()

    if (expenses.length === 0) {
      return red('No expenses found.')
    }

    if (month !== undefined) {
      if (month < 1 || month > 12) {
        throw new Error(red('Invalid month. Please provide a number between 1 and 12.'))
      }

      const filteredExpenses = expenses.filter((expense: Expense) => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getMonth() + 1 === month
      })

      const totalForMonth = filteredExpenses.reduce(
        (sum: number, expense: Expense) => sum + expense.amount,
        0
      )

      const monthName = new Date(2023, month - 1).toLocaleString('default', { month: 'long' })
      return yellow(`Total expenses for ${monthName}: $${totalForMonth.toFixed(2)}`)
    }

    const total = expenses.reduce((sum: number, expense: Expense) => sum + expense.amount, 0)

    return yellow(`Total expenses: $${total.toFixed(2)}`)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(red(`Failed to get expense summary: ${error.message}`))
    }
    throw new Error(red('An unexpected error occurred while getting expense summary'))
  }
}
