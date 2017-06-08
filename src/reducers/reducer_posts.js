import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';


export default function (state = {}, action) {
    switch (action.type) {
        case DELETE_POST:
            return _.omit(state, action.payload);
        case FETCH_POST:
            // ES5 syntax 
            const post = action.payload.data;
            const newState = { ...state };
            newState[post.id] = post;
            return newState;
        // return{...state,[action.payload.data.id]: action.payload.data}//take alll the existing state and put them in the current state obj
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');// return a list of objects with the id as the key
        default:
            return state;
    }
}