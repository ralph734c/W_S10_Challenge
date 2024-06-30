import React, { useState } from "react";
import { useCreateOrderMutation } from "../state/pizzaFormApi";
import { useDispatch } from "react-redux";

const initialFormState = {
  // suggested
  fullName: "",
  size: "",
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
};

export default function PizzaForm() {
  const [fullName, setFullName] = useState(initialFormState.fullName);
  const [size, setSize] = useState(initialFormState.size);
  const [toppings, setToppings] = useState({
    1: initialFormState[1],
    2: initialFormState[2],
    3: initialFormState[3],
    4: initialFormState[4],
    5: initialFormState[5],
  });
  
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  
  return (
    <form>
      <h2>Pizza Form</h2>
      {true && <div className="pending">Order in progress...</div>}
      {true && (
        <div className="failure">Order failed: fullName is required</div>
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
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select data-testid="sizeSelect" id="size" name="size">
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" />
          Pepperoni
          <br />
        </label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" />
          Green Peppers
          <br />
        </label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" />
          Pineapple
          <br />
        </label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" />
          Mushrooms
          <br />
        </label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" />
          Ham
          <br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
