import { Expense } from '../models/expense.ts'
import { loadExpencesFromCSV } from '../utils/index.ts'

export async function getSummary(month?: number): Promise<string> {
  try {
    const expenses = await loadExpencesFromCSV()

    if (expenses.length === 0) {
      return 'No expenses found.'
    }

    if (month !== undefined) {
      if (month < 1 || month > 12) {
        throw new Error('Invalid month. Please provide a number between 1 and 12.')
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
      return `Total expenses for ${monthName}: $${totalForMonth.toFixed(2)}`
    }

    const total = expenses.reduce((sum: number, expense: Expense) => sum + expense.amount, 0)

    return `Total expenses: $${total.toFixed(2)}`
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get expense summary: ${error.message}`)
    }
    throw new Error('An unexpected error occurred while getting expense summary')
  }
}
