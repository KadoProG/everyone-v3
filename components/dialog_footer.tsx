import Link from "next/link";
import "../public/css/dialog_menu.scss";
import { useState } from "react";

const DialogMenu = () => {
  const menuItems = [
    { link: "/", title: "HOMEに戻る", ex: false },
    {
      link: "https://fast5-blog.com/html-product/uni-web/",
      title: "Kadoのサイトに戻る",
      ex: false,
    },
    {
      link: "https://sub3.fast5-blog.com",
      title: "NextJSの仮ポートフォリオ",
      ex: true,
    },
    {
      link: "https://x.com/KadoUniversity",
      title: "X [@KadoUniversity]",
      ex: true,
    },
    {
      link: "https://github.com/KadoProG",
      title: "GitHub [KadoProG]",
      ex: true,
    },
  ];
  const [hasOpen, setHasOpen] = useState<boolean>(false);
  const handleClick = () => {
    setHasOpen(!hasOpen);
  };

  const handleClose = () => {
    setHasOpen(false);
  };
  return (
    <>
      <div
        className={`dialog__menu${hasOpen ? "" : " disabled"}`}
        onClick={handleClose}
      >
        <div
          className="dialog__menu__content"
          onClick={(e) => e.stopPropagation()}
        >
          {menuItems.map((v, index) => {
            const strTarget = v.ex ? "_blank" : "_self";
            return (
              <Link href={v.link} key={index} target={strTarget}>
                {v.title}
              </Link>
            );
          })}
          <p className="copyright">&copy; KadoBloG 2023</p>
        </div>
      </div>
      <button className="single__footer__left" onClick={handleClick}>
        <span className={hasOpen ? "checked" : ""}></span>
      </button>
    </>
  );
};

export default DialogMenu;
