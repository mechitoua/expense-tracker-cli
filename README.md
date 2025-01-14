# Expense Tracker CLI

A command-line expense tracking application that helps you manage your daily expenses. Keep track of your spending, view summaries, and manage your financial records directly from your terminal.

## Prerequisites

- [Deno](https://deno.land/) runtime (version 1.37.0 or higher)

## Installation

1. Clone this repository:

```bash
git clone https://github.com/mechitoua/expense-tracker-cli.git
```

```bash
cd expense-tracker-cli
```

2. Install dependencies and compile:

```bash
deno task compile
```

## Available Commands

### Add an Expense

Add a new expense with a description and amount:

```bash
./expense-tracker add --description "Lunch" --amount 20
```

### List Expenses

View all recorded expenses:

```bash
./expense-tracker list
```

This will display a table with ID, Date, Description, and Amount columns.

### Delete an Expense

Remove an expense using its ID:

```bash
./expense-tracker delete --id 1
```

### View Summary

Get a summary of your expenses:

```bash
# View total of all expenses
./expense-tracker summary

# View expenses for a specific month
./expense-tracker summary --month 8
```

## Examples

Here's a typical workflow:

```bash
# Add some expenses
$ expense-tracker add --description "Groceries" --amount 75.50
Expense added successfully (ID: 1)

$ expense-tracker add --description "Coffee" --amount 4.50
Expense added successfully (ID: 2)

# View all expenses
$ expense-tracker list
ID Date        Description Amount
1  2024-01-20  Groceries   $75.50
2  2024-01-20  Coffee      $4.50

# View total expenses
$ expense-tracker summary
Total expenses: $80.00

# Remove an expense
$ expense-tracker delete --id 2
Expense deleted successfully

# View monthly summary
$ expense-tracker summary --month 1
Total expenses for January: $75.50
```
