import '../public/css/dialog_confirm.scss';

type Props = {
  isVisible: boolean;
  question: string | string[];
  onClose(num: number | undefined): void;
  answers: string[];
};
const DialogConfirm = (props: Props) => {
  return (
    <div
      className={`confirm${props.isVisible ? ' enabled' : ''}`}
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
              <button key={index} onClick={() => props.onClose(index)}>
                {v}
              </button>
            );
          })}
          <button onClick={() => props.onClose(undefined)}>戻る</button>
        </div>
      </div>
    </div>
  );
};

export default DialogConfirm;
