import { ProductType } from '@/domain/product';
import { CartActionType } from '@/store/cart/action';

export interface CartState {
  readonly cartList: ProductType[];
  readonly isLoading: boolean;
  readonly loadingCartProductId: number | null;
  readonly selectedCartItem: number[];
}

const initialState: CartState = {
  cartList: [],
  isLoading: false,
  loadingCartProductId: null,
  selectedCartItem: [],
};

const cartReducer = (state = initialState, action): CartState => {
  switch (action.type) {
    case CartActionType.GET_CART_START: {
      return { ...state, isLoading: true };
    }

    case CartActionType.GET_CART_SUCCEEDED: {
      const {
        payload: { cartList },
      } = action;

      return { ...state, cartList, isLoading: false };
    }

    case CartActionType.GET_CART_FAILED: {
      return { ...state, isLoading: false };
    }

    case CartActionType.ADD_CART_START: {
      return { ...state, isLoading: true };
    }

    case CartActionType.ADD_CART_SUCCEEDED: {
      const {
        payload: { cartItem },
      } = action;

      return { ...state, cartList: [...state.cartList, cartItem], isLoading: false };
    }

    case CartActionType.ADD_CART_FAILED: {
      return { ...state, isLoading: false };
    }

    case CartActionType.DELETE_CART_START: {
      return { ...state, isLoading: true };
    }

    case CartActionType.DELETE_CART_SUCCEEDED: {
      const {
        payload: { deletedCartId },
      } = action;

      const newCartList = state.cartList.filter(cart => cart.id !== deletedCartId);

      return { ...state, isLoading: false, cartList: newCartList };
    }

    case CartActionType.DELETE_CART_FAILED: {
      return { ...state, isLoading: false };
    }

    case CartActionType.DELETE_SELECTED_CART_ITEM_START: {
      return { ...state, isLoading: true };
    }

    case CartActionType.DELETE_SELECTED_CART_ITEM_SUCCEEDED: {
      const {
        payload: { selectedCartItem },
      } = action;

      return {
        ...state,
        isLoading: false,
        cartList: state.cartList.filter(cart => !selectedCartItem.includes(cart.id)),
        selectedCartItem: [],
      };
    }

    case CartActionType.DELETE_SELECTED_CART_ITEM_FAILED: {
      return { ...state, isLoading: false };
    }

    case CartActionType.PATCH_CART_START: {
      const {
        payload: { id },
      } = action;

      return { ...state, loadingCartProductId: id };
    }

    case CartActionType.PATCH_CART_SUCCEEDED: {
      const {
        payload: { id, quantity },
      } = action;

      const newCartList = state.cartList.map(cart => {
        if (cart.id === id) {
          return { ...cart, quantity };
        }
        return cart;
      });

      return { ...state, loadingCartProductId: null, cartList: newCartList };
    }

    case CartActionType.PATCH_CART_FAILED: {
      return { ...state, loadingCartProductId: null };
    }

    case CartActionType.SELECT_CART_ITEM: {
      const {
        payload: { id },
      } = action;

      if (state.selectedCartItem.includes(id)) {
        return {
          ...state,
          selectedCartItem: state.selectedCartItem.filter(selectedId => selectedId !== id),
        };
      }
      return { ...state, selectedCartItem: [...state.selectedCartItem, id] };
    }

    case CartActionType.SELECT_EVERY_CART_ITEM: {
      if (state.selectedCartItem.length === state.cartList.length) {
        return {
          ...state,
          selectedCartItem: [],
        };
      }

      return {
        ...state,
        selectedCartItem: state.cartList.map(cart => cart.id),
      };
    }

    case CartActionType.ADD_ORDER_ITEM_START:
      return { ...state, isLoading: true };

    case CartActionType.ADD_ORDER_ITEM_SUCCEEDED: {
      const {
        payload: { orderList },
      } = action;
      const orderIdList = orderList.map(order => order.cartItemId);
      const newCartList = [...state.cartList];

      orderIdList.forEach(id => {
        newCartList.forEach((cart, index) => {
          if (id === cart.id) {
            newCartList.splice(index, 1);
          }
        });
      });

      return { ...state, selectedCartItem: [], cartList: newCartList, isLoading: false };
    }

    case CartActionType.ADD_ORDER_ITEM_FAILED:
      return { ...state, isLoading: false };

    default: {
      return state;
    }
  }
};

export default cartReducer;
