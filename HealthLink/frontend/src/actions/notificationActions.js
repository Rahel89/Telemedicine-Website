import axios from 'axios';
import {
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
} from './actionTypes';

export const fetchNotificationsRequest = () => ({
  type: FETCH_NOTIFICATIONS_REQUEST,
});

export const fetchNotificationsSuccess = (notifications) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  payload: notifications,
});

export const fetchNotificationsFailure = (error) => ({
  type: FETCH_NOTIFICATIONS_FAILURE,
  payload: error,
});

export const fetchNotifications = () => {
  return async (dispatch) => {
    dispatch(fetchNotificationsRequest());
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://healt-link-v36m.onrender.com/api/auth/notifications', {
          headers: {
            'x-auth-token': token
          }
        });      dispatch(fetchNotificationsSuccess(response.data.notifications));
    } catch (error) {
      dispatch(fetchNotificationsFailure(error.message));
    }
  };
};
