import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as FavoritesActions } from '../ducks/favorites';

export function* addFavorite(action) {
  try {
    /* First do the request */
    const { data } = yield call(api.get, `/repos/${action.payload.repository}`);

    // the call method from Saga is used when you are dealing with promises (in this case from the axios request in the api call)
    // call takes the method to be called as first param, and its arguments as later params

    // check if it is already in state
    const isDupe = yield select(state =>
      state.favorites.data.find(favorite => favorite.id === data.id)
    );

    if (isDupe) {
      yield put(FavoritesActions.addFavoriteFailure('Duplicated repository'));
    } else {
      /* Second massage the data */
      const repositoryData = {
        id: data.id,
        name: data.full_name,
        description: data.description,
        url: data.html_url,
      };

      /* Third send the forward action call to redux */
      yield put(FavoritesActions.addFavoriteSuccess(repositoryData));
      // call the action that will be catched by a reducer, passing the data that the action expects.
    }
  } catch (error) {
    yield put(FavoritesActions.addFavoriteFailure('Failed to fetch data'));
  }
}
