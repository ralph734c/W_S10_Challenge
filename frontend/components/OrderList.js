import React from "react";
import { useGetOrdersQuery } from "../state/orderListApi";
import { useSelector, useDispatch } from "react-redux";
import { changeSize } from "../state/slice";

export default function OrderList() {
  const filterSize = useSelector((state) => state.pizza.filterState.size);
  const dispatch = useDispatch();
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching orders</div>;

  const handleFilterChange = (size) => {
    dispatch(changeSize(size));
  };

  const filteredOrders =
    filterSize === "All"
      ? orders
      : orders?.filter((order) => order.size === filterSize);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders?.map((order) => {
          const toppingsCount = order.toppings ? order.toppings.length : 0;
          return (
            <li key={order.id}>
              <div>{`${order.customer} ordered a size ${order.size} with ${toppingsCount} toppings`}</div>
            </li>
          );
        })}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        <button
          data-testid="filterBtnAll"
          className={`button-filter${filterSize === "All" ? " active" : ""}`}
          onClick={() => handleFilterChange("All")}
        >
          All
        </button>
        <button
          data-testid="filterBtnS"
          className={`button-filter${filterSize === "S" ? " active" : ""}`}
          onClick={() => handleFilterChange("S")}
        >
          S
        </button>
        <button
          data-testid="filterBtnM"
          className={`button-filter${filterSize === "M" ? " active" : ""}`}
          onClick={() => handleFilterChange("M")}
        >
          M
        </button>
        <button
          data-testid="filterBtnL"
          className={`button-filter${filterSize === "L" ? " active" : ""}`}
          onClick={() => handleFilterChange("L")}
        >
          L
        </button>
      </div>
    </div>
  );
}