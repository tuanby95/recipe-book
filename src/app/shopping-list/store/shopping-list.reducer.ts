import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.action';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState, 
  action: ShoppingListAction.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload] 
      };
    case ShoppingListAction.UPDATE_INGREDIENT:
      const ingredient =  state.ingredients[state.editedIngredientIndex];
      const updateIngredient = {
        ...ingredient,
        ...action.payload
      }
      const updateIngredients = [...state.ingredients];
      updateIngredients[state.editedIngredientIndex] = updateIngredient;
      return {
        ...state,
        ingredients: updateIngredients,
        editedIngredientIndex : -1,
        editedIngredient : null
      };
    case ShoppingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredientIndex : -1,
        editedIngredient : null
      };
    case ShoppingListAction.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };
    case ShoppingListAction.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state; 
  }
}
