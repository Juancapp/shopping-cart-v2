import { useState } from "react";
import Modal from "../Modal";
import Button, { ButtonVariant } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../../../config/api";

interface ParamsType {
  userId: string;
  img: string;
}

function ProfilePicture() {
  const userId = "65d9a1c087472dcdbfc301f0";
  const urlImg = `https://${import.meta.env.VITE_APP_BUCKET_NAME}.s3.${
    import.meta.env.VITE_APP_REGION
  }.amazonaws.com/${import.meta.env.VITE_APP_FOLDER_NAME}/${userId}.jpg`;

  const [imageSrc, setImageSrc] = useState(urlImg);

  const postPictureMutation = useMutation<void, Error, ParamsType>({
    mutationKey: ["postPicture"],
    mutationFn: async (variables: ParamsType) => {
      await postRequest<ParamsType>(
        `${import.meta.env.VITE_APP_API_URL}/user/picture`,
        variables
      );
    },
    onSuccess: async () => {
      setImageSrc(urlImg + "?" + new Date().getTime());
    },
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const base64 = imageSrc?.split(",")[1];
    const params = {
      userId: userId,
      img: base64,
    };

    postPictureMutation.mutate(params);
  };

  return (
    <Modal>
      <h1 className="text-white text-xl inline-block">Upload photo</h1>
      <div className="relative self-center">
        <div className="h-40 w-40 border-4 rounded-full overflow-hidden">
          <img src={imageSrc} alt="" className="w-full h-full object-cover" />
        </div>
        <label className="cursor-pointer absolute bottom-0 right-0">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-full hover:bg-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="6" width="18" height="12" rx="2" ry="2" />
              <circle cx="12" cy="12" r="3" />
              <path d="M8 6h8m-8 0l2-3h4l2 3" />
            </svg>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleChange(e)}
            accept="image/jpeg"
          />
        </label>
      </div>
      <div className="self-center md:self-end mt-6 flex gap-2">
        <Button text="Cancel" />
        <Button
          variant={ButtonVariant.BLACK}
          onClick={handleSubmit}
          text="Save"
        />
      </div>
    </Modal>
  );
}

export default ProfilePicture;
