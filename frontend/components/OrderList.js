import React from "react";
import { useGetOrdersQuery } from "../state/orderListApi";
import { useSelector, useDispatch } from "react-redux";
import { changeSize } from "../state/slice";

export default function OrderList() {
  const filterSize = useSelector((state) => state.filter_state.size);
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
          return (
            <li key={order.id}>
              <div>{`${order.customer} ordered a size ${order.size} with ${order.toppings.length} toppings`}</div>
            </li>
          );
        })}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {["All", "S", "M", "L"].map((size) => {
          const className = `button-filter${size === filterSize ? " active" : ""}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => handleFilterChange(size)}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
