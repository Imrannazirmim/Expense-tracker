import categoriesList from "../categoriesList.ts";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <select
      className="form-select mt-5"
      onChange={(e) => onSelectCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      {categoriesList.map((category) => {
        return <option value={category}>{category}</option>;
      })}
    </select>
  );
};
export default ExpenseFilter;
