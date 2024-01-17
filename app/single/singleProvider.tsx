'use client';

import { Provider } from 'react-redux';
import Single from '../../components/single';
import SingleHooks from './singleHooks';
import { fetchData } from './singleSlice';
import { store } from './store';

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
