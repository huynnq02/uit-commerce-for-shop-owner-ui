const initialState = {
  name: "",
  email: "",
  hotLine: "",
  profilePicture: "",
  address: "",
  isLoggedIn: false,
};
export default function ShopReducer(state = initialState, action) {
  switch (action.type) {
    case "login_shop.reply":
      if (action.data.success === true) {
        return {
          ...state,
          name: action.data.data.name,
          email: action.data.data.email,
          hotLine: action.data.data.hotLine,
          profilePicture: action.data.data.profilePicture,
          address: action.data.data.address,
          items: action.data.data.items,
        };
      }
    /* falls through */
    default:
      return state;
  }
}
