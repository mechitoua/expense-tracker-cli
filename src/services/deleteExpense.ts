import { loadExpencesFromCSV, saveExpencesToCSV } from '../utils/index.ts'

export async function deleteExpense(id: string): Promise<{ success: boolean; message: string }> {
  try {
    let expenses = await loadExpencesFromCSV()
    const expense = expenses.find((expense) => expense.id === id)

    if (!expense) {
      return {
        success: false,
        message: 'Expense not found!'
      }
    }

    expenses = expenses.filter((expense) => expense.id !== id)
    await saveExpencesToCSV(expenses)

    return {
      success: true,
      message: 'Expense deleted successfully!'
    }
  } catch (error) {
    return {
      success: false,
      message: `Failed to delete expense: ${(error as Error).message}`
    }
  }
}
