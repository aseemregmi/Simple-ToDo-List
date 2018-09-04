import { USER_SIGNUP } from './types';
import axios from 'axios';

export default user => {
  return async dispatch => {
    const res = await axios.post(
      'https://protected-thicket-67134.herokuapp.com/users',
      user
    );

    const auth = res.headers['x-auth'];

    localStorage.setItem(
      'user',
      JSON.stringify({
        'x-auth': auth,
        email: res.data.email,
        _id: res.data._id
      })
    );

    dispatch({
      type: USER_SIGNUP,
      payload: {
        'x-auth': auth,
        email: res.data.email,
        _id: res.data._id
      }
    });
  };
};