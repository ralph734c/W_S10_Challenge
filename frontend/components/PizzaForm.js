import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../state/pizzaApi';
import {
  updateForm,
  resetForm,
  setMessage,
  clearMessage,
} from '../state/slice';

export default function PizzaForm() {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.pizza.formState);
  const message = useSelector((state) => state.message);

  const [createOrder, { isLoading }] =
    useCreateOrderMutation();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      const newToppings = checked
        ? [...formState.toppings, value]
        : formState.toppings.filter((topping) => topping !== value);

      dispatch(updateForm({ toppings: newToppings }));
    } else {
      dispatch(updateForm({ [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createOrder(formState).unwrap();
      dispatch(setMessage({ textContent: response.message, type: 'success' }));
      dispatch(resetForm());
    } catch (error) {
      console.error('Failed to submit order:', error);
      dispatch(
        setMessage({
          textContent: error.data?.message || 'An error occurred',
          type: 'failure',
        })
      );
    }
  };

  useEffect(() => {
    if (message.textContent) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className="pending">Order in progress...</div>}
      {message.textContent && (
        <div className={message.type}>
          {message.type === 'failure' ? 'Order failed: ' : ''}
          {message.textContent}
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
            name="Pepperoni"
            type="checkbox"
            value="1"
            checked={formState.toppings.includes('1')}
            onChange={handleChange}
          />
          Pepperoni
          <br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="Green Peppers"
            type="checkbox"
            value="2"
            checked={formState.toppings.includes('2')}
            onChange={handleChange}
          />
          Green Peppers
          <br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="Pineapple"
            type="checkbox"
            value="3"
            checked={formState.toppings.includes('3')}
            onChange={handleChange}
          />
          Pineapple
          <br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="Mushrooms"
            type="checkbox"
            value="4"
            checked={formState.toppings.includes('4')}
            onChange={handleChange}
          />
          Mushrooms
          <br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="Ham"
            type="checkbox"
            value="5"
            checked={formState.toppings.includes('5')}
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
