import ProfileImage from "../ProfileImage";
import axios from "axios";
import "./style.css";

const FullScreenImage = ({ fullScreenImg, user, setFullScreenImg }) => {
  const download = () => {
    console.log(fullScreenImg.src);
    axios.get(fullScreenImg.src).then((res) => {
      console.log(res);
      const binary = res.data;
      console.log(typeof binary);
      const imageType = fullScreenImg.type;

      if (!binary || !imageType) {
        console.error("File Type or file src not availble");
      }

      const imageExtention = imageType.split("/")[1];
      const element = document.createElement("a");
      const file = new Blob([binary], { type: "application/octet-stream" });
      console.log(URL.createObjectURL(file));
      element.href = URL.createObjectURL(file);
      element.download = fullScreenImg.fileName;
      console.log(file, imageExtention, element);
      element.click();
    });
  };

  return (
    <div className="full-screen-container">
      <nav className="nav-bar">
        <div className="nav-avatar">
          <ProfileImage userName={user.name} color={user.color} />
          <div className="name-info-container">
            <span className="name">{user.name}</span>
            <span className="time">{user.role}</span>
          </div>
        </div>
        <div className="nav-icons">
          <span onClick={() => download()} className="nav-icon fas fa-download"></span>
          <span onClick={() => setFullScreenImg({})} className="nav-icon fas fa-times"></span>
        </div>
      </nav>
      <div className="full-screen-img-container">
        <img className="full-screen-img" src={fullScreenImg.src} />
      </div>
    </div>
  );
};

export default FullScreenImage;
