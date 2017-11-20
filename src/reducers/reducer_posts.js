import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

export default function(state={}, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
