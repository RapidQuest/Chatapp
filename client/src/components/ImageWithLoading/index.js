import { useState } from "react";
import "./style.css";

const ImageWithLoading = ({ src, height, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded ? <div className="loading-placeholder" style={{ height }}></div> : null}
      <img
        src={src}
        className={loaded ? className : "loading-img"}
        onLoad={() => setLoaded(true)}
        alt="Loading Image"
      />
    </>
  );
};

export default ImageWithLoading;
