import { useState } from 'react';
import '../public/css/dialog_file_upload.scss';
import DialogConfirm from './single/DialogConfirm';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  pushArrMessage,
  setFavorites,
} from '../app/single/singleSlice';

type Props = {
  isVisible: boolean;
  onClose(): void;
};

const DialogFileUpload = (props: Props) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const favorites = data.favorites;

  // 確認画面の表示・非表示
  const [isVisibleConfirm, setIsVisibleConfirm] = useState<boolean>(false);
  // ファイルデータ「お気に入り」の格納場所（ファイルは格納したらすぐ破棄する）
  const [fileText, setFileText] = useState<number[]>([]);

  // ファイルが変更されたときの処理
  const handleChange = (files: FileList | null) => {
    if (!files) return;
    const file = files[0];
    if (!file) return;

    // ファイルリーダーで読み込みをします
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const result = reader.result;
      if (!result || typeof result !== 'string') return;

      // 改行で分割
      const items = result.split('\n').map((v) => parseInt(v));
      // 不正文字は排除
      const items2 = items.filter((v) => !isNaN(v) && String(v).length > 5);

      if (items2.length === 0) return;
      // 一度格納
      setFileText(items2);

      // 既存の要素が0個の場合ダイアログなしで実行
      if (favorites.length === 0) {
        setJoinFavorites(1);
        onClose();
        return;
      }
      // 一度ダイアログを表示
      setIsVisibleConfirm(true);
    };
  };

  // インポートされたテキストデータと既存のお気に入りデータを結合
  const setJoinFavorites = (type: 0 | 1) => {
    if (type === 0) {
      // 0: 現在のデータに追加
      const addFavorites = fileText.filter((v) => !favorites.includes(v));
      const newFavorites = [...favorites, ...addFavorites];
      const newFavorites2 = newFavorites.sort((a, b) => a - b);
      dispatch(setFavorites(newFavorites2));
    } else {
      // 1: ファイルのデータのみ
      dispatch(setFavorites(fileText)); // 上書き
    }
    dispatch(pushArrMessage('Success: お気に入りを更新しました'));
  };

  // 確認画面後の処理
  const handleConfirm = (num: number | undefined) => {
    setIsVisibleConfirm(false);
    if (num !== undefined && (num === 1 || num === 0)) {
      setJoinFavorites(num);
    }
    onClose();
  };

  // ファイルアップロードのダイアログを閉じる
  const onClose = () => {
    const elm: any = document.getElementById('dialog__file__upload__input');
    if (!elm) return;
    elm.value = '';
    props.onClose();
  };

  return (
    <div
      className={`fileUpload${props.isVisible ? ' enabled' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <DialogConfirm
        question="現在のデータに追加しますか？それともファイルのデータのみにしますか？"
        answers={['現在のデータに追加', 'ファイルのデータのみ']}
        isVisible={isVisibleConfirm}
        onClose={handleConfirm}
      />
      <div className="item" onClick={(e) => e.stopPropagation()}>
        <input
          type="file"
          id="dialog__file__upload__input"
          onChange={(e) => handleChange(e.target.files)}
        />
        <p>ここにドラッグアンドドロップ or クリックで挿入</p>
      </div>
      <button>前の画面に戻る</button>
    </div>
  );
};

export default DialogFileUpload;
