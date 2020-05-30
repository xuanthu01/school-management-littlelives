export const filterPaymentTypes =
  (
    array: Array<any>,
    payment_type: string
  ) => array.filter((item) => item.payment_type === payment_type);