import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../state/pizzaFormApi";
import { updateForm, resetForm } from "../state/slice";

export default function PizzaForm() {
  const formState = useSelector((state) => state.pizza.formState);
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const newToppings = checked
        ? [...formState.toppings, value]
        : formState.toppings.filter((topping) => topping !== value);

      dispatch(updateForm({ toppings: newToppings }));
    } else {
      dispatch(updateForm({ [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder(formState).unwrap();
      dispatch(resetForm());
    } catch (error) {
      console.error("Failed to submit order:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className="pending">Order in progress...</div>}
      {error && (
        <div className="failure">
          Order failed: {error.data?.message || "An error occurred"}
        </div>
      )}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={formState.size}
            onChange={handleChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            value="1"
            checked={formState.toppings.includes("1")}
            onChange={handleChange}
          />
          Pepperoni
          <br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            value="2"
            checked={formState.toppings.includes("2")}
            onChange={handleChange}
          />
          Green Peppers
          <br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            value="3"
            checked={formState.toppings.includes("3")}
            onChange={handleChange}
          />
          Pineapple
          <br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            value="4"
            checked={formState.toppings.includes("4")}
            onChange={handleChange}
          />
          Mushrooms
          <br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            value="5"
            checked={formState.toppings.includes("5")}
            onChange={handleChange}
          />
          Ham
          <br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
