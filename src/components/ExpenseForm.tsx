import categoriesList from "../categoriesList.ts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be 3 character" })
    .max(100),
  amount: z
    .number({ invalid_type_error: "number is required" })
    .min(0.01, { message: "Number is should be minimum (0.01)" })
    .max(100_00000),
  category: z.enum(categoriesList, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});
type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="m-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <input
          {...register("description")}
          type="text"
          id="description"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="m-3">
        <label htmlFor="amount" className="form-label">
          Amount:
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          id="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="m-3">
        <label htmlFor="category" className="form-label">
          Select Category
        </label>
        <select className="form-select">
          <option value=""></option>
          {categoriesList.map((category) => {
            return (
              <option
                id="category"
                {...register("category")}
                value={category}
                key={category}
              >
                {category}
              </option>
            );
          })}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <div className="m-3">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};
export default ExpenseForm;
