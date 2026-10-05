import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setStudentNo } from '@/app/single/singleSlice';
import { Button } from '@/components/commons/Button';
import styles from '@/components/domains/single/no/ShowFavorites.module.scss';
import { changeStudentNo, changeYearNo } from '@/utils/change';

export const ShowFavorites: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const favorites = data.favorites;

  // 学年[]→学生番号[]の形にする
  const groupFavorites = useMemo(() => {
    const groupData: { [key: number]: { year: number; no: number[] } } = {};

    favorites.forEach((v) => {
      const res = changeYearNo(v);

      if (!groupData[res.year]) {
        groupData[res.year] = { year: res.year, no: [] };
      }

      groupData[res.year].no.push(res.no);
    });

    return Object.values(groupData);
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
