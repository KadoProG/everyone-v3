import { useState } from "react";
import "../public/css/dialog_file_upload.scss";
import DialogConfirm from "./dialog_confirm";
import { localStrage } from "../features/update";

type Props = {
  isVisible: boolean;
  onClose(result: { data: number[]; type: number } | undefined): void;
};
const DialogFileUpload = (props: Props) => {
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
      if (!result || typeof result !== "string") return;

      // 改行
      const items = result.split("\n").map((v) => parseInt(v));

      // 不正文字は排除
      const items2 = items.filter((v) => !isNaN(v) && String(v).length > 5);

      if (items2.length === 0) return;

      // 一度格納
      setFileText(items2);

      const itemIncludes = localStrage.getFavorites();

      // 既存の要素が0個の場合ダイアログなし
      if (itemIncludes.length === 0) {
        onClose({ data: fileText, type: 0 });
        return;
      }

      // 一度ダイアログを表示
      setIsVisibleConfirm(true);
    };
  };

  // 確認画面後の処理
  const handleConfirm = (num: number | undefined) => {
    if (num === undefined) {
      resetInput();
      setIsVisibleConfirm(false);
      return;
    }

    // あとはNoに任せた！
    onClose({ data: fileText, type: num });
  };

  // INPUTの中身をリセット
  const resetInput = () => {
    // eslint-disable-next-line
    const elm: any = document.getElementById("dialog__file__upload__input");
    if (!elm) return;
    elm.value = "";
  };

  const onClose = (data: { data: number[]; type: number } | undefined) => {
    resetInput();
    props.onClose(data);
  };

  return (
    <div
      className={`fileUpload${props.isVisible ? " enabled" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onClose(undefined);
      }}
    >
      <DialogConfirm
        question="現在のデータに追加しますか？それともファイルのデータのみにしますか？"
        answers={["現在のデータに追加", "ファイルのデータのみ"]}
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
