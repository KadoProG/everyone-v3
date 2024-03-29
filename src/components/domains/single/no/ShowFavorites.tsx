import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setStudentNo } from '@/app/single/singleSlice';
import { Button } from '@/components/commons/Button';
import styles from '@/components/domains/single/no/ShowFavorites.module.scss';
import { changeStudentNo, changeYearNo } from '@/utils/change';

export const ShowFavorites: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const favorites = data.favorites;

  const [groupFavorites, setGroupFavorites] = useState<
    { year: number; no: number[] }[]
  >([]);

  // 学年[]→学生番号[]の形にする
  useEffect(() => {
    const newFavorites: { year: number; no: number[] }[] = [];
    const groupData: { [key: number]: { year: number; no: number[] } } = {};

    if (favorites.length === 0) {
      setGroupFavorites([]);
      return;
    }
    favorites.forEach((v) => {
      const res = changeYearNo(v);

      if (!groupData[res.year]) {
        groupData[res.year] = { year: res.year, no: [] };
      }

      groupData[res.year].no.push(res.no);
    });

    for (const year in groupData) {
      newFavorites.push(groupData[year]);
    }

    setGroupFavorites(newFavorites);
  }, [favorites]);

  return (
    <section className={styles.favorite}>
      {groupFavorites.length === 0 && <p>お気に入りが表示されます</p>}
      {groupFavorites.map((v, index) => (
        <div key={index}>
          <p>{v.year}年度</p>
          {v.no.map((w, index) => (
            <Button
              key={index}
              onClick={() => dispatch(setStudentNo(changeStudentNo(v.year, w)))}
              label={String(w)}
            />
          ))}
        </div>
      ))}
    </section>
  );
};
