import React from "react";
import PizzaForm from "./PizzaForm";
import OrderList from "./OrderList";
import { Provider } from "react-redux";
import { resetStore } from "../state/store";

export default function App() {
  return (
    <div id="app">
      <Provider store={resetStore}>
        <PizzaForm />
        <OrderList />
      </Provider>
    </div>
  );
}
