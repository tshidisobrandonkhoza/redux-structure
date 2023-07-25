//create a store and initialze the state
const redux = require('redux');
const createStore = redux.createStore;

//bind/combine actions Action creators
const bindActionsCreators = redux.bindActionCreators;

//bind/combine Reducers creators
const combineReducers = redux.combineReducers;


//====================================================================
//create an action
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCK = 'CAKE_RESTOCK';

const ICE_ORDERED = 'ICE_ORDERED';
const ICE_RESTOCK = 'ICE_RESTOCK';

function orderCake(qty = 0) {

    return {
        type: CAKE_ORDERED,
        qty
    }
}
function restockCake(qty = 0) {
    return {
        type: CAKE_RESTOCK,
        qty
    }
}
function orderIce(qty = 0) {

    return {
        type: ICE_ORDERED,
        qty
    }
}
function restockIce(qty = 0) {
    return {
        type: ICE_RESTOCK,
        qty
    }
}
//====================================================================

//====================================================================
//initializing states
const initialStateIce = {

    numOfIce: 10
}
const initialStateCake = {
    numOfCake: 10
}
//create a Reducer
const reducerCake = (state = initialStateCake, action) => {
    switch (action.type) {
        case CAKE_ORDERED: return {
            ...state, numOfCake: state.numOfCake - action.qty
        }
        case CAKE_RESTOCK: return {
            ...state, numOfCake: state.numOfCake + action.qty
        }
        default: {
            return state;
        }
    }
}
const reducerIce = (state = initialStateIce, action) => {
    switch (action.type) {
        case ICE_ORDERED: return {
            ...state, numOfIce: state.numOfIce - action.qty
        }
        case ICE_RESTOCK: return {
            ...state, numOfIce: state.numOfIce + action.qty
        }

        default: {
            return state;
        }
    }
}
//====================================================================

//====================================================================
//combine reducers
const rootReducer = combineReducers({
    cake: reducerCake,
    ice: reducerIce
})
//initialize the store
const store = createStore(rootReducer);

//====================================================================

//====================================================================
console.log('Initiale State', store.getState());
const unsubcribe = store.subscribe(() => {
    console.log('Updated State', store.getState());
});
//dispatching actions
// store.dispatch(orderCake());
// store.dispatch(orderCake(2));
// store.dispatch(restockCake(10));
// store.dispatch(orderCake(1));

// action binder takes in objects and the store.dispatch
const actionCreators = bindActionsCreators({ orderCake, restockCake, orderIce, restockIce, }, store.dispatch);
actionCreators.orderCake(2);
actionCreators.restockCake(10);
actionCreators.orderCake(1);
actionCreators.restockIce(5);
//====================================================================

unsubcribe();