"use client";

import { useEffect, useState } from "react";
import { changeStudentNo, changeYearNo, pracData } from "../features/update";
import DialogMenu from "./dialog_footer";
import PanelNo from "./panel_no";
import MultiIframe from "./multi_iframe";
import { useSession } from "next-auth/react";

type Props = {
  initData: { first: number; favorites: number[] };
};

const fetchPOST = async (
  id: string,
  first: number,
  favorites: number[]
): Promise<{
  success: boolean;
  data: { first: number; favorites: number[] };
}> => {
  const json = { favorites, first };

  const res = await fetch(`/api/users/${id}`, {
    method: "POST",
    body: JSON.stringify(json),
  });
  return await res.json();
};

const Multi = (props: Props) => {
  // ステータス情報を取得
  const { data: session } = useSession();

  const initData = props.initData; // 初期値を取得

  // -------- ここからステートの変数宣言
  // お気に入りリスト
  const [favorites, setFavorites] = useState<number[]>(initData.favorites);

  // データを更新する
  useEffect(() => {
    if (session?.user?.name) {
      fetchPOST(session?.user.name, initData.first, favorites);
    } else {
      // // ローカルストレージに書き込み
      // localStrage.setFavorites(newFavorites);
    }
  }, [favorites]);

  // ダイアログのINDEX
  const [selectDialog, setSelectDialog] = useState<number>(-1);

  // ダイアログを表示
  const handleSelect = (num: number) => {
    if (selectDialog === num) {
      buttonClose();
      return;
    }
    setSelectDialog(num);
  };

  // ダイアログを閉じる
  const buttonClose = () => {
    setSelectDialog(-1);
  };

  // お気に入りボタン押下時の処理
  const handleFavoriteChange = (bool: boolean, studentNo: number) => {
    // お気に入りリストに登録・削除
    const newFavorites = bool
      ? [...favorites, studentNo]
      : favorites.filter((v) => v !== studentNo);

    const newFavorites2 = newFavorites.sort((a, b) => a - b);

    setFavorites(newFavorites2);
  };

  // 値を格納
  const [range, setRange] = useState<{ year: number; st: number; en: number }>({
    year: 2021,
    st: 50,
    en: 100,
  });

  const students: number[] = [];
  for (let i = range.st; i < range.en + 1; i++) {
    const studentNo = changeStudentNo(range.year, i);
    students.push(studentNo);
  }

  // ボタン押下時の処理
  const onStNo = (num: number) => {
    setRange({ ...range, st: num });
  };

  const onEnNo = (num: number) => {
    setRange({ ...range, en: num });
  };
  const onYear = (num: number) => {
    setRange({ ...range, year: num });
  };

  return (
    <div>
      <div className="iframe">
        <div>
          {students.map((v, index) => {
            const yearNo = changeYearNo(v);
            const url = pracData[0].makeUrl(yearNo.year, yearNo.no, 0);
            return (
              <MultiIframe
                key={index}
                url={url}
                studentNo={v}
                isFavorite={favorites.includes(v)}
                onIsFavorite={(bool) => handleFavoriteChange(bool, v)}
              />
            );
          })}
        </div>
      </div>
      <div className="single__footer">
        <DialogMenu
          onClose={buttonClose}
          onSelect={() => handleSelect(0)}
          isVisible={selectDialog === 0}
        />
        <div className="single__footer__right">
          <div className="single__footer__right__buttonContainer">
            <div className="panel">
              <p>初め</p>
              <PanelNo no={range.st} onChangeNo={onStNo} />
            </div>
            <div className="panel">
              <p>終り</p>
              <PanelNo no={range.en} onChangeNo={onEnNo} />
            </div>
            <div className="panel">
              <p>年度</p>
              <PanelNo no={range.year} onChangeNo={onYear} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Multi;
