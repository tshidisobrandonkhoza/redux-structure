//create a store and initialze the state
const { produce } = require('immer');
const redux = require('redux');
const createStore = redux.createStore;
//middlerware
const applyMiddleWare = redux.applyMiddleware;

//logger
const logger = require('redux-logger').createLogger();

//bind/combine actions Action creators
const bindActionsCreators = redux.bindActionCreators;
//bind/combine Reducers creators
const combineReducers = redux.combineReducers;

//immer for nested states
const produceImmer = require('immer').produce;

//thunk middleware
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

//====================================================================
//create an action
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCK = 'CAKE_RESTOCK';
const ICE_ORDERED = 'ICE_ORDERED';
const ICE_RESTOCK = 'ICE_RESTOCK';
const UPDATE_CITY = 'UPDATE_CITY';
const UPDATE_STREET = 'UPDATE_STREET';
const UPDATE_ZIP = 'UPDATE_ZIP';
//create actions for users 
const FETCH_USER_REQ = 'FETCH_USER_REQ';
const FETCH_USER_SUCC = 'FETCH_USER_SUCC';
const FETCH_USER_FAIL = 'FETCH_USER_FAIL';



//action creators
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
function updateStreet(street = '') {
    return {
        type: UPDATE_STREET,
        street
    }
}
function updateZip(zip = '') {
    return {
        type: UPDATE_ZIP,
        zip
    }
}
function updateCity(city = '') {
    return {
        type: UPDATE_CITY,
        city
    }
}

const fetchusersreq = () => {
    return {
        type: FETCH_USER_REQ
    }
}
const fetchuserssucc = (users) => {
    return {
        type: FETCH_USER_SUCC,
        users
    }
}
const fetchusersfail = (error = '') => {
    return {
        type: FETCH_USER_FAIL,
        error
    }
}
//====================================================================
//initializing states

const initialStateIce = {

    numOfIce: 10
}
const initialStateCake = {
    numOfCake: 10
}
const initialStoreDetails = {
    name: 'Tee Cube',
    address: {
        city: 'Pretoria',
        street: 'Lilian',
        zip: 1234
    }

}
const initialUsers = {
    loading: false,
    users: [],
    error: ''
}

//create  reducers
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
const reducerStoreDetails = (state = initialStoreDetails, action) => {
    switch (action.type) {
        case UPDATE_STREET: return {
            ...state, address: { ...state.address, street: action.street }
        }
        case UPDATE_ZIP: return {
            ...state, address: { ...state.address, zip: action.zip }
        }
        case UPDATE_CITY: return produce(state, (prodState) => {
            prodState.address.city = action.city
        })
        default:
            return state;
    }
}
const reducerUsers = (state = initialUsers, action) => {
    switch (action.type) {
        case FETCH_USER_REQ: return {
            ...state, loading: true
        }

        case FETCH_USER_SUCC: return {
            ...state, loading: false, users: action.users
        }

        case FETCH_USER_FAIL: return {
            ...state, loading: false, users: [], error: action.error
        }

        default: {
            return state;
        }
    }
}
//====================================================================
//combine reducers
const rootReducer = combineReducers({
    cake: reducerCake,
    ice: reducerIce,
    storeInfo: reducerStoreDetails,
    users: reducerUsers
})

//====================================================================
//initialize the store
//const store = createStore(rootReducer, applyMiddleWare(logger, thunkMiddleware));


const store = createStore(rootReducer, applyMiddleWare(thunkMiddleware, logger));

//====================================================================
console.log('Initiale State', store.getState());
console.log('*************************Updated*************************');

//const unsubcribe = store.subscribe(()=>{});

//dispatching actions
// store.dispatch(orderCake());
// store.dispatch(orderCake(2)); 

// action binder takes in objects and the store.dispatch

const fetchUsers = () => {
    return ((dispatch) => {
        dispatch(fetchusersreq());
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            const users = response.data.map(user => user.id);
            dispatch(fetchuserssucc(users));
        }).catch(error => {
            dispatch(fetchusersfail(error.message));
        })
    });
}


const actionCreators = bindActionsCreators({
    orderCake, restockCake,
    orderIce, restockIce,
    updateStreet, updateZip, updateCity,
    fetchUsers
}, store.dispatch);
// const unsubcribe = store.subscribe(() => {
//     console.log('Updated State', store.getState());
// });

actionCreators.orderCake(2);
actionCreators.restockCake(10);
actionCreators.orderCake(1);
actionCreators.restockIce(5);
actionCreators.updateStreet('Alex');
actionCreators.updateZip(4321);
actionCreators.updateCity('Johannesburg');
actionCreators.fetchUsers();

//====================================================================
//unsubcribe();