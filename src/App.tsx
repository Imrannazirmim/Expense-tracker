import ExpenseForm from "./components/ExpenseForm.tsx";
import { useState } from "react";
import ExpenseList from "./components/ExpenseList.tsx";
import ExpenseFilter from "./components/ExpenseFilter.tsx";

const expensesData = [
  { id: 1, description: "aaaa", amount: 22, category: "Groceries" },
  { id: 2, description: "bbbb", amount: 33, category: "Utilities" },
  { id: 3, description: "cccc", amount: 55, category: "Entertainment" },
];

const App = () => {
  const [expenses, setExpenses] = useState(expensesData);
  const [selectCategory, setSelectCategory] = useState("");

  const visibleCategory = selectCategory
    ? expenses.filter((e) => e.category === selectCategory)
    : expenses;
  return (
    <div className="m-5">
      <ExpenseForm
        onSubmit={(expense) =>
          setExpenses([
            ...expenses,
            {
              ...expense,
              id: expenses.length + 1,
            },
          ])
        }
      />
      <ExpenseFilter
        onSelectCategory={(category) => setSelectCategory(category)}
      />
      <ExpenseList
        expenses={visibleCategory}
        onDelete={(id) =>
          setExpenses(expenses.filter((expense) => expense.id !== id))
        }
      />
    </div>
  );
};
export default App;
