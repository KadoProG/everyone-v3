import { useEffect, useState } from "react";
import { changeStudentNo, changeYearNo, localStrage } from "../features/update";
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

  // エクスポートダイアログ
  const [isVisibleExport, setIsVisibleExport] = useState<boolean>(false);

  // 削除ダイアログ
  const [isVisibleDelete, setIsVisibleDelete] = useState<boolean>(false);

  // 学年順に格納
  const [favorites, setFavorites] = useState<{ year: number; no: number[] }[]>(
    []
  );

  // お気に入りを学年順に表示されるように変更
  useEffect(() => {
    const newFavorites: { year: number; no: number[] }[] = [];
    const groupData: { [key: number]: { year: number; no: number[] } } = {};

    if (props.favorites.length === 0) {
      setFavorites([]);
      return;
    }
    props.favorites.forEach((v) => {
      const res = changeYearNo(v);

      if (!groupData[res.year]) {
        groupData[res.year] = { year: res.year, no: [] };
      }

      groupData[res.year].no.push(res.no);
    });

    for (const year in groupData) {
      newFavorites.push(groupData[year]);
    }

    setFavorites(newFavorites);
  }, [props.favorites]);

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

      const newFavorites = [...props.favorites, ...addFavorites];

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

  // エクスポートの処理
  const handleExport = (result: number | undefined) => {
    setIsVisibleExport(false);
    if (result === undefined) return;
    if (result === 0) {
      // txtデータをエクスポートします
      const data = localStrage.getFavorites();
      const text = data.join("\n");
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my_favorite_data.txt";
      a.click();
      URL.revokeObjectURL(url);
      props.onAddMessage("Success: エクスポートが完了しました");
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

      <DialogConfirm
        question="お気に入りデータをエクスポートします。よろしいですか？"
        isVisible={isVisibleExport}
        answers={["はい"]}
        onClose={handleExport}
      />

      <DialogFileUpload
        isVisible={isVisibleFileUpload}
        onClose={handleImport}
      />

      <p className="favoriteP">
        <b>お気に入り</b>
        <button onClick={() => setIsVisibleFileUpload(true)}>インポート</button>
        <button onClick={() => setIsVisibleExport(true)}>エクスポート</button>
        {props.favorites.length !== 0 && (
          <button onClick={() => setIsVisibleDelete(true)}>削除</button>
        )}
      </p>
      <section className="favorite">
        {favorites.length === 0 && <p>お気に入りが表示されます</p>}
        {favorites.map((v, index) => {
          return (
            <div key={index}>
              <p>{v.year}年度</p>
              {v.no.map((w, index) => {
                return (
                  <button
                    key={index}
                    onClick={() =>
                      props.onStudentNo(changeStudentNo(v.year, w))
                    }
                  >
                    {w}
                  </button>
                );
              })}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default DialogNoFavorite;
