const initialState = {
  id: "",
  name: "",
  email: "",
  hotLine: "",
  profilePicture: "",
  address: "",
  items: [],
  orders: [],
  customers: [],
  isLoggedIn: false,
};
export default function ShopReducer(state = initialState, action) {
  switch (action.type) {
    case "get_list_customers.reply":
      console.log(action.data);
      console.log("Van zo dc bthg ma ta:", action.data.data);
      if (action.data.success === true) {
        console.log("Van zo dc bthg ma ta:", action.data.data);
        return {
          ...state,
          customers: action.data.data,
        };
      }
      break;
    case "get_all_shop_items.reply":
      if (action.data.success === true) {
        return {
          ...state,
          items: action.data.data,
        };
      }
      break;
    case "get_shop_orders.reply":
      if (action.data.success === true) {
        return {
          ...state,
          orders: action.data.data,
        };
      }
      break;
    case "login_shop.reply":
      if (action.data.success === true) {
        return {
          ...state,
          id: action.data.data.id,
          name: action.data.data.name,
          email: action.data.data.email,
          hotLine: action.data.data.hotLine,
          profilePicture: action.data.data.profilePicture,
          address: action.data.data.address,
          items: action.data.data.items,
          isLoggedIn: true,
        };
      }
      break;
    case "create_item.reply":
      if (action.data.success === true) {
        return {
          ...state,
          items: [...state.items, action.data.data],
        };
      } else {
        return {
          ...state,
          errorMessage: "Can't create item ",
        };
      }
    case "logout":
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
