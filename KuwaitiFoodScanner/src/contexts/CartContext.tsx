import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Cart, CartItem, MenuItem, Restaurant } from '../types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  restaurantId: string | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { menuItem: MenuItem; restaurantId: string; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_RESTAURANT'; payload: { restaurantId: string } };

interface CartContextType {
  state: CartState;
  addItem: (menuItem: MenuItem, restaurantId: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setRestaurant: (restaurantId: string) => void;
  canAddItem: (restaurantId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { menuItem, restaurantId, quantity = 1 } = action.payload;
      
      // Check if we're adding from a different restaurant
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        // Clear cart if adding from different restaurant
        return {
          items: [{
            id: `${Date.now()}-${Math.random()}`,
            menuItemId: menuItem.id,
            restaurantId,
            quantity,
            addedAt: new Date(),
          }],
          totalItems: quantity,
          totalPrice: menuItem.priceComparisons[0]?.price || 0,
          restaurantId,
        };
      }

      // Check if item already exists
      const existingItemIndex = state.items.findIndex(
        item => item.menuItemId === menuItem.id
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + (menuItem.priceComparisons[0]?.price || 0) * quantity,
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${Date.now()}-${Math.random()}`,
          menuItemId: menuItem.id,
          restaurantId,
          quantity,
          addedAt: new Date(),
        };

        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + (menuItem.priceComparisons[0]?.price || 0) * quantity,
          restaurantId: state.restaurantId || restaurantId,
        };
      }
    }

    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload.itemId);
      if (!itemToRemove) return state;

      const updatedItems = state.items.filter(item => item.id !== action.payload.itemId);
      const itemPrice = itemToRemove.quantity * (itemToRemove.quantity * 0); // This would need actual price calculation

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: Math.max(0, state.totalPrice - itemPrice),
        restaurantId: updatedItems.length === 0 ? null : state.restaurantId,
      };
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { itemId } });
      }

      const updatedItems = state.items.map(item => {
        if (item.id === itemId) {
          const quantityDiff = quantity - item.quantity;
          return { ...item, quantity };
        }
        return item;
      });

      // Recalculate totals (simplified - would need actual price calculation)
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.quantity * 0), 0); // Placeholder

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        restaurantId: null,
      };

    case 'SET_RESTAURANT':
      return {
        ...state,
        restaurantId: action.payload.restaurantId,
      };

    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  restaurantId: null,
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (menuItem: MenuItem, restaurantId: string, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { menuItem, restaurantId, quantity } });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setRestaurant = (restaurantId: string) => {
    dispatch({ type: 'SET_RESTAURANT', payload: { restaurantId } });
  };

  const canAddItem = (restaurantId: string) => {
    return !state.restaurantId || state.restaurantId === restaurantId;
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setRestaurant,
        canAddItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
