import { useEffect, useState } from "react";
import { localStrage } from "../features/update";
import DialogFileUpload from "./dialog_file_upload";
import DialogConfirm from "./dialog_confirm";

type Props = {
  onIframeVisible(bool: boolean): void;
  onStudentNo(num: number): void;
  onAddMessage(message: string): void;
  favorites: number[];
  setFavorites(favorites: number[]): void;
};

const DialogNoFavorite = (props: Props) => {
  // ファイルアップロードか否か
  const [isVisibleFileUpload, setIsVisibleFileUpload] =
    useState<boolean>(false);

  // 削除ダイアログ
  const [isVisibleDelete, setIsVisibleDelete] = useState<boolean>(false);

  // インポートの処理
  const handleImport = (
    result: { data: number[]; type: number } | undefined
  ) => {
    setIsVisibleFileUpload(false);
    if (result === undefined) return;
    // 0: 現在のデータに追加
    // 1: ファイルのデータのみ
    if (result.type === 1) {
      props.setFavorites(result.data); // 上書き

      // ローカルストレージに書き込み
      localStrage.setFavorites(result.data);

      props.onAddMessage("Success: お気に入りを更新しました");
    } else if (result.type === 0) {
      // 差分を追加
      const addFavorites = result.data.filter(
        (v) => !props.favorites.includes(v)
      );

      const newFavorites = props.favorites;

      newFavorites.push(...addFavorites);

      props.setFavorites(newFavorites);

      // ローカルストレージに書き込み
      localStrage.setFavorites(newFavorites);

      props.onAddMessage("Success: お気に入りを更新しました");
    }
  };

  // 削除の処理
  const handleFavoriteDelete = (result: number | undefined) => {
    setIsVisibleDelete(false);
    if (result === undefined) return;
    if (result === 0) {
      // 削除を実行
      props.setFavorites([]);

      // ローカルストレージに書き込み
      localStrage.setFavorites([]);

      props.onAddMessage("Success: お気に入りを削除しました");
    }
  };

  // iframeの表示・非表示
  useEffect(() => {
    props.onIframeVisible(isVisibleFileUpload || isVisibleDelete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisibleFileUpload, isVisibleDelete]);

  return (
    <>
      <DialogConfirm
        question="本当に削除してもよろしいですか？"
        isVisible={isVisibleDelete}
        answers={["削除する"]}
        onClose={handleFavoriteDelete}
      />

      <DialogFileUpload
        isVisible={isVisibleFileUpload}
        onClose={handleImport}
      />

      <p className="favoriteFlex">
        <b>お気に入り</b>
        <button onClick={() => setIsVisibleFileUpload(true)}>インポート</button>
        <button>エクスポート</button>
        {props.favorites.length !== 0 && (
          <button onClick={() => setIsVisibleDelete(true)}>削除</button>
        )}
      </p>
      <section className="prac">
        {props.favorites.length === 0 && <p>お気に入りが表示されます</p>}
        {props.favorites.map((v, index) => {
          return (
            <button key={index} onClick={() => props.onStudentNo(v)}>
              {v}
            </button>
          );
        })}
      </section>
    </>
  );
};

export default DialogNoFavorite;
