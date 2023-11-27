import Image from "next/image";

type IframeProps = {
  url: string;
  studentNo: number;
  isFavorite: boolean;
  onIsFavorite(bool: boolean): void;
};
const MultiIframe = (props: IframeProps) => {
  // 現在のやつがお気に入りか
  const isFavorite = props.isFavorite;

  // お気に入りボタン押下時の処理
  const handleFavoriteChange = () => {
    const newIsFavorite = !isFavorite;
    props.onIsFavorite(newIsFavorite);
  };

  return (
    <div>
      <iframe src={props.url} width={1260} height={1260}></iframe>
      <button onClick={handleFavoriteChange}>
        <Image
          src={
            isFavorite ? "/images/star_blue_icon.svg" : "/images/star_icon.svg"
          }
          width={150}
          height={150}
          alt="星"
        />
      </button>
      <div>
        <p>{props.studentNo}</p>
      </div>
    </div>
  );
};

export default MultiIframe;
