import { CLOUDINARY } from "@/lib/constant";
import { API_CLOUDINARY_IMAGE_UPLOAD } from "@/service/endpoint";
import axios from "axios";
import { useRef, useState } from "react";

const UploadImage = ({ onAddImage, setIsPhotoLoading, isPhotoLoading, className }) => {
  const profileImageRef = useRef();
  const [photo, setPhoto] = useState(null);

  const handelPhotoClick = () => {
    profileImageRef?.current.click();
  };

  const handelPhotosUpload = async (event) => {
    setIsPhotoLoading(true);
    const fileObj = event.target.files && event.target.files[0];

    if (!fileObj) {
      return;
    }

    if (fileObj) {
      setPhoto(URL.createObjectURL(fileObj));
    }

    const formData = new FormData();
    formData.append("file", fileObj);
    formData.append("upload_preset", `${CLOUDINARY.preset}`);
    formData.append("cloud_name", `${CLOUDINARY.name}`);

    try {
      const response = await axios.post(API_CLOUDINARY_IMAGE_UPLOAD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.secure_url;
      console.log("Uploaded Image URL:", imageUrl);

      onAddImage(imageUrl);
      setIsPhotoLoading(false);
    } catch (err) {
      console.error("Error uploading image to Cloudinary:", err);
      setIsPhotoLoading(false);
    }
  };

  return (
    <>
      <div className="mt-2 ">
        <div className="size-[100px] relative">
          <input
            style={{ display: "none" }}
            ref={profileImageRef}
            type="file"
            onChange={handelPhotosUpload}
          />
          <div>
            <img
              width={100}
              height={100}
              className={className ?? "size-[100px] rounded-full overflow-hidden"}
              src={photo ? photo : "https://placehold.co/600"}
              alt="profile image"
            />
          </div>
          {isPhotoLoading && (
            <div
              className={`bg-[#00000081] ${className} h-[100px] top-0 left-0 absolute rounded-full z-10`}
            >
              <p className="text-white">loading.....</p>
            </div>
          )}
          <button
            type="button"
            onClick={handelPhotoClick}
            disabled={isPhotoLoading}
            className="font-semibold text-sm hover:underline text-primary"
          >
            upload
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
