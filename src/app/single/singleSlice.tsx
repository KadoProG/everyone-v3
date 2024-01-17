import { createSlice } from '@reduxjs/toolkit';

export type IframeStatus = {
  width: number;
  height: number;
  isObstacle: boolean; // 背面に隠れる
  scale?: number;
};

// ステートメントとして管理する変数ら
interface DataState {
  studentNo: number; // 現在の学生番号
  favorites: number[]; // お気に入り
  first: number; // 最初に表示
  arrMessage: string[]; // メッセージ群を格納
  isLocalStorage: boolean; // ローカルストレージか否か
  url: string; // 現在のURL
  pracIndex: number; // 課題項目[Web,Java,ﾏﾙｳｪｱ]
  pracDetail: number; // 課題項目[EX01, EX02]
  iframeStatus: IframeStatus; // iframeの状態
}

export interface RootState {
  data: DataState;
}

const initialState: DataState = {
  studentNo: 20216050,
  favorites: [],
  first: 20216050,
  arrMessage: [],
  isLocalStorage: true,
  url: '',
  pracIndex: 0,
  pracDetail: 0,
  iframeStatus: { width: 0, height: 0, isObstacle: false },
};

export const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // 現在の学生番号変更
    setStudentNo: (state, action: { type: any; payload: number }) => {
      state.studentNo = action.payload;
    },

    // お気に入り変更
    setFavorites: (state, action: { type: any; payload: number[] }) => {
      state.favorites = action.payload;
    },

    // 「最初に表示」変更
    setFirst: (state, action: { type: any; payload: number }) => {
      state.first = action.payload;
    },

    // メッセージを追加
    pushArrMessage: (state, action: { type: any; payload: string }) => {
      const newArrMessage = [...state.arrMessage, action.payload];
      state.arrMessage = newArrMessage;
    },

    // URLを変更
    setUrl: (state, action: { type: any; payload: string }) => {
      state.url = action.payload;
    },

    // 現在の学生番号のお気に入り変更
    setCurrentFavorite: (state, action: { type: any; payload: boolean }) => {
      const newFavorites = action.payload
        ? [...state.favorites, state.studentNo]
        : state.favorites.filter((v) => v !== state.studentNo);
      const newFavorites2 = newFavorites.sort((a, b) => a - b);
      state.favorites = newFavorites2;
    },

    // 現在の学生番号の「最初に表示」変更
    setCurrentFirst: (state, action: { type: any; payload: boolean }) => {
      const newData = action.payload ? state.studentNo : 20216050;
      state.first = newData;
    },

    // ローカルストレージか否か
    setIsLocalStorage: (state, action: { type: any; payload: boolean }) => {
      state.isLocalStorage = action.payload;
    },

    // 課題項目[Web,Java,ﾏﾙｳｪｱ]
    setPracIndex: (state, action: { type: any; payload: number }) => {
      state.pracDetail = 0;
      state.pracIndex = action.payload;
    },
    // 課題項目[EX01, EX02]
    setPracDetail: (state, action: { type: any; payload: number }) => {
      state.pracDetail = action.payload;
    },

    setIframeStatus: (state, action: { type: any; payload: IframeStatus }) => {
      state.iframeStatus = action.payload;
    },

    setIframeVisible: (state, action: { type: any; payload: boolean }) => {
      state.iframeStatus.isObstacle = action.payload;
    },

    //
    fetchData: (
      store,
      action: {
        type: any;
        payload: {
          first: number;
          favorites: number[];
          isLocalStorage: boolean;
        };
      }
    ) => {
      store.isLocalStorage = action.payload.isLocalStorage;
      if (!action.payload.isLocalStorage) {
        store.first = action.payload.first;
        store.studentNo = action.payload.first;
        store.favorites = action.payload.favorites;
      }
    },
  },
});

// reducersの関数をエクスポート
export const {
  setStudentNo,
  setFavorites,
  setFirst,
  pushArrMessage,
  setUrl,
  setCurrentFavorite,
  setCurrentFirst,
  setIsLocalStorage,
  setIframeStatus,
  setIframeVisible,
  fetchData,
  setPracIndex,
  setPracDetail,
} = DataSlice.actions;
