import { red } from 'https://deno.land/std@0.224.0/fmt/colors.ts'
import { loadExpencesFromCSV, saveExpencesToCSV } from '../utils/index.ts'
export async function deleteExpense(id: string): Promise<{ success: boolean; message: string }> {
  try {
    let expenses = await loadExpencesFromCSV()
    const expense = expenses.find((expense) => expense.id === id)

    if (!expense) {
      return {
        success: false,
        message: red('Expense not found!')
      }
    }

    expenses = expenses.filter((expense) => expense.id !== id)
    await saveExpencesToCSV(expenses)

    return {
      success: true,
      message: red('Expense deleted successfully!')
    }
  } catch (error) {
    return {
      success: false,
      message: red(`Failed to delete expense: ${(error as Error).message}`)
    }
  }
}
