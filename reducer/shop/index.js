const initialState = {
  name: "",
  email: "",
  hotLine: "",
  profilePicture: "",
  address: "",
};
export default function ShopReducer(state = initialState, action) {
  switch (action.type) {
    case "loginShop.reply":
      if (action.data.success === true) {
        return {
          ...state,
          name: action.data.data.name,
          email: action.data.data.email,
          hotLine: action.data.data.hotLine,
          profilePicture: action.data.data.profilePicture,
          address: action.data.data.address,
          isLoggedin: true,
        };
      }
    /* falls through */
    default:
      return state;
  }
}
