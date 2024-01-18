import { Button } from '@/components/commons/Button';
import styles from '@/components/domains/single/DialogConfirm.module.scss';

interface DialogConfirmProps {
  /**
   * 表示・非表示
   */
  isVisible: boolean;
  /**
   * 質問 配列で改行が可能
   */
  question: string | string[];
  /**
   * ダイアログを閉じたときの動作
   * これを実行しても単体では非表示にされない
   * @returns 回答のインデックス、あるいはundefined
   */
  onClose(num: number | undefined): void;
  /**
   * 回答（配列で）
   */
  answers: string[];
}

/**
 * 確認ダイアログ 閉じる際答えのインデックス値を返す
 */
export const DialogConfirm = (props: DialogConfirmProps) => {
  return (
    <div
      className={styles.confirm + (props.isVisible ? ' ' + styles.enabled : '')}
      onClick={(e) => {
        e.stopPropagation();
        props.onClose(undefined);
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {typeof props.question === 'string' ? (
          <p>{props.question}</p>
        ) : (
          props.question.map((v, index) => <p key={index}>{v}</p>)
        )}
        <div>
          {props.answers.map((v, index) => {
            return (
              <Button
                key={index}
                label={v}
                onClick={() => props.onClose(index)}
              />
            );
          })}
          <Button onClick={() => props.onClose(undefined)} label="戻る" />
        </div>
      </div>
    </div>
  );
};
