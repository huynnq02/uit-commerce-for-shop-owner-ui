export const getAPIs = {
  get_shop_orders: {
    name: "get_shop_orders",
    path: "/api/orders/get_shop_orders",
    method: "GET",
  },
  login_shop: {
    name: "login_shop",
    path: "/api/auth/login_shop",
    method: "POST",
  },
  create_item: {
    name: "create_item",
    path: "/api/items/create_item",
    method: "POST",
  },
  get_all_shop_items: {
    name: "get_all_shop_items",
    path: "/api/items/get_all_shop_items",
    method: "GET",
  },
  get_list_customers: {
    name: "get_list_customers",
    path: "/api/shops/get_list_customers",
    method: "GET",
  },
};
