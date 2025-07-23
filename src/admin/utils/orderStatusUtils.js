import { ORDER_STATUS_STEPS } from "../constants/orderStatus";

export const getStatusOrderMap = () =>
  ORDER_STATUS_STEPS.reduce((acc, step, index) => {
    acc[step] = index + 1;
    return acc;
  }, {});
