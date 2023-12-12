import { useDispatch, useSelector } from 'react-redux';
import '../../public/css/dialog_prac.scss';
import {
  RootState,
  setPracDetail,
  setPracIndex,
} from '../../app/single/singleSlice';
import pracData from '../../features/pracData';

type Props = {
  onClose(): void;
  onSelect(): void;
  isVisible: boolean;
};

const DialogPrac = (props: Props) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const pracIndex = data.pracIndex;
  const pracDetail = data.pracDetail;
  const isVisible = props.isVisible;

  const handlePracChange = (bool: boolean, index: number) => {
    if (!bool) return;
    dispatch(setPracIndex(index));
  };
  const handleDetailChange = (bool: boolean, index: number) => {
    if (!bool) return;
    dispatch(setPracDetail(index));
  };

  return (
    <>
      <div
        className={`dialog${isVisible ? '' : ' disabled'}`}
        onClick={props.onClose}
      >
        <div className="dialog__content" onClick={(e) => e.stopPropagation()}>
          <p>
            <b>授業を選ぶ</b>
          </p>
          <div className="prac">
            {pracData.map((v, index) => {
              return (
                <span key={index}>
                  <input
                    type="radio"
                    name="dialog__prac"
                    id={'dialog__prac__' + index}
                    checked={pracIndex === index}
                    onChange={(e) => handlePracChange(e.target.checked, index)}
                  />
                  <label htmlFor={'dialog__prac__' + index}>{v.title}</label>
                </span>
              );
            })}
          </div>
          <p>
            <b>課題を選ぶ</b>
          </p>
          <div className="prac detail">
            {pracData[pracIndex].pracs.map((v, index) => {
              return (
                <span key={index}>
                  <input
                    type="radio"
                    name="dialog__prac__detail"
                    id={'dialog__prac__detail__' + index}
                    onChange={(e) =>
                      handleDetailChange(e.target.checked, index)
                    }
                    checked={pracDetail === index}
                  />
                  <label htmlFor={'dialog__prac__detail__' + index}>
                    {v.name}
                  </label>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="single__footer__right__button">
        <button onClick={props.onSelect}>
          <span>{pracData[pracIndex].mini}</span>
          <span>{pracData[pracIndex].pracs[pracDetail].name}</span>
        </button>
        <span>講義・課題</span>
      </div>
    </>
  );
};
export default DialogPrac;
