'use client';

import { Provider } from 'react-redux';
import SingleHooks from '@/app/single/singleHooks';
import { fetchData } from '@/app/single/singleSlice';
import { store } from '@/app/single/store';
import { SinglePage } from '@/components/pages/single/SinglePage';

type Props = {
  initData: { first: number; favorites: number[]; isLocalStorage: boolean };
};
const SingleProvider = (props: Props) => {
  const initData = props.initData;
  store.dispatch(fetchData(initData));

  return (
    <Provider store={store}>
      <SinglePage />
      <SingleHooks />
    </Provider>
  );
};
export default SingleProvider;
