import { useRef, useEffect } from "react";

function Banner() {
  const videoContainersRef = useRef([]);

  useEffect(() => {
    const videoContainers = document.querySelectorAll(".video-container");
    videoContainersRef.current = Array.from(videoContainers);

    const playVideo = (e) => {
      const video = e.currentTarget.querySelector("video");
      const image = e.currentTarget.querySelector("img");
      video.style.display = "block";
      image.style.display = "none";
      video.currentTime = 0;
      video.play();
    };

    const stopVideo = (e) => {
      const video = e.currentTarget.querySelector("video");
      const image = e.currentTarget.querySelector("img");
      video.pause();
      video.style.display = "none";
      image.style.display = "block";
    };

    const addEventListeners = () => {
      videoContainersRef.current.forEach((container) => {
        container.addEventListener("mouseenter", playVideo);
        container.addEventListener("mouseleave", stopVideo);
      });
    };

    const removeEventListeners = () => {
      videoContainersRef.current.forEach((container) => {
        container.removeEventListener("mouseenter", playVideo);
        container.removeEventListener("mouseleave", stopVideo);
      });
    };

    addEventListeners();

    return () => {
      removeEventListeners();
    };
  }, []);

  return (
    <div className="banner">
      <div className="row g-0 p-0">
        <div className="col-6">
          <div className="position-relative video-container" data-video-id="video1">
            <video id="video1" src="sushi.mp4" className="w-100 h-70 object-fit-cover" loop muted></video>
            <img id="image1" src="sushi.jpg" className="w-100 h-70 object-fit-cover" alt="Image" />
          </div>
        </div>
        <div className="col-6">
          <div className="position-relative video-container" data-video-id="video2">
            <video id="video2" src="matcha.mp4" className="w-100 h-70 object-fit-cover" loop muted></video>
            <img id="image2" src="matcha.png" className="w-100 h-70 object-fit-cover" alt="Image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
