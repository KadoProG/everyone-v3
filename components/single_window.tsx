import SmallContents from "./small_contents";

type Props = {
  className?: string;
  animation?: boolean;
};
const SingleWindow = (props: Props) => {
  const className = props.className ? " " + props.className : "";
  const isAnimation = props.animation ? props.animation : false;

  const classAnimationName = isAnimation ? " singleWindowAnimation" : "";

  const resultClassName = "singleWindow" + className + classAnimationName;
  return (
    <div className={resultClassName}>
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div>
        <SmallContents />
      </div>
    </div>
  );
};

export default SingleWindow;
