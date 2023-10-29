import { useState } from "react";
import "../public/css/dialog_file_upload.scss";
import DialogConfirm from "./dialog_confirm";

type Props = {
  isVisible: boolean;
  onClose(result: { data: number[]; type: number } | undefined): void;
};
const DialogFileUpload = (props: Props) => {
  const [isVisibleConfirm, setIsVisibleConfirm] = useState<boolean>(false);
  const [fileText, setFileText] = useState<number[]>([]);
  const onDragEnter = () => {
    console.log("dragenter");
  };

  const handleChange = (files: FileList | null) => {
    if (!files) return;
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const result = reader.result;
      if (!result || typeof result !== "string") return;

      const items = result.split("\n").map((v) => parseInt(v));

      const items2 = items.filter((v) => !isNaN(v));

      if (items2.length === 0) return;

      setFileText(items2);
      setIsVisibleConfirm(true);
    };
  };

  const handleConfirm = (num: number | undefined) => {
    if (num === undefined) {
      resetInput();
      setIsVisibleConfirm(false);
      return;
    }

    // あとはNoに任せた！
    onClose({ data: fileText, type: num });
  };

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
      onDragEnter={onDragEnter}
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
