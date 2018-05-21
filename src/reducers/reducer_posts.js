import _ from 'lodash';
import { FETCH_POST, FETCH_POSTS, DELETE_POST } from '../actions';

export default function(state={}, action) {
  switch (action.type) {
    case FETCH_POST:
      // const post = action.payload.data;
      // const newState = {...state};
      // newState[post.id] = post;
      // return newState;
      // console.log({ ...state, [action.payload.data.id]: action.payload.data });
      return { ...state, [action.payload.data.id]: action.payload.data }; // take the posts we already fetched
    case FETCH_POSTS:
      // console.log(action.payload.data);
      // [
      //   { id: 4, title: 'Hi!},
      //   { id: 25, title: 'Bye'},
      //   { id: 36, title: 'Hows it going'}
      // ]
      return _.mapKeys(action.payload.data, 'id');// { "4": {"id": "4", "title": "Hi!"}, "25": { "id": "25", "title": "Bye"}, ...}

    case DELETE_POST:
      return _.omit(state, action.payload); // Remove the key from the state object
    default:
      return state;
  }
}
