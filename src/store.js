// store.js

import { createStore } from 'redux';

// Définissez des actions (types d'actions)
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Créez un reducer pour gérer l'état de votre application
const initialState = {
    count: 0,
};

function counterReducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1,
            };
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1,
            };
        default:
            return state;
    }
}

// Créez le store Redux en utilisant le reducer
const store = createStore(counterReducer);

export default store;
