'use client';

import { Provider } from 'react-redux';
import Single from '../../components/single';
import { store } from './store';
import { fetchData } from './singleSlice';
import SingleHooks from './singleHooks';

type Props = {
  initData: { first: number; favorites: number[]; isLocalStorage: boolean };
};
const SingleProvider = (props: Props) => {
  const initData = props.initData;
  store.dispatch(fetchData(initData));

  return (
    <Provider store={store}>
      <Single />
      <SingleHooks />
    </Provider>
  );
};
export default SingleProvider;
