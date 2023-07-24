//create a store and initialze the state
const redux = require('redux');
const createStore = redux.createStore;


//create an action
const CAKE_ORDERED = 'CAKE_ORDERED';

function orderCake() {
    let theOrder = {
        type: CAKE_ORDERED,
        quantity: 1
    }
    return theOrder
}


//initializing state
const initialState = {
    numOfCake: 10
}

//create a Reducer
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case CAKE_ORDERED: return {
            ...state,
            numOfCake: state.numOfCake - 1
        }
        default: {
            return state;
        }

    }
}
const store = createStore(reducer);
console.log('Initiale State', store.getState());
const unsubcribe = store.subscribe(() => {
    console.log('Initiale Updated State', store.getState());
});

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

unsubcribe();