'use client';

import { Provider } from 'react-redux';
import SingleHooks from '@/app/single/singleHooks';
import { fetchData } from '@/app/single/singleSlice';
import { store } from '@/app/single/store';
import { SinglePage } from '@/components/pages/single/SinglePage';

type Props = {
  /**
   * Git連携の場合initDataを設定
   */
  initData?: { first: number; favorites: number[] };
};
const SingleProvider = (props: Props) => {
  // Git連携の場合はここでステートメントを更新
  if (props.initData) store.dispatch(fetchData(props.initData));

  return (
    <Provider store={store}>
      <SinglePage />
      <SingleHooks />
    </Provider>
  );
};
export default SingleProvider;
