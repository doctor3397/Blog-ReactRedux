import _ from 'lodash';
import { FETCH_POST, FETCH_POSTS, DELETE_POST } from '../actions';

export default function(state={}, action) {
  switch (action.type) {
    case FETCH_POST:
      // const post = action.payload.data;
      // const newState = {...state};
      // newState[post.id] = post;
      // return newState;
      // console.log(action);
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      // console.log(action.payload.data);
      // [
      //   { id: 1,
      //     title: 'Hi!',
      //     categories: 'Computer, Friends',
      //     content: 'Post about Friends'
      //   },
      //   {
      //     id: 2,
      //     title: 'New Post',
      //     categories: 'Candy',
      //     content: 'Post about Candy'
      //   }
      // ]
      return _.mapKeys(action.payload.data, 'id');// { 4: post4, 10: post10, ...}

    case DELETE_POST:
      return _.omit(state, action.payload); // Remove the key from the state object
    default:
      return state;
  }
}
