import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import defaultFoto from "../../../../assets/images/logo/noPhoto.png";
import API from "../../../../configs/api";
import { toastify } from "../../../../components/base/toastify";
import { useDispatch } from "react-redux";
import { getActiveUser } from "../../../../configs/redux/features/userSlice";
export default function StoreInformation({
  activeUser,
  handleOpenMenu,
  openMenu,
}) {
  const today = new Date();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState({
    selectedImage: null,
    file: null,
  });

  console.log(activeUser);
  const [detailProfile, setDetailProfile] = useState({
    name: "",
    email: "",
    phone_number: "",
    description: "",
  });
  const handleChangeImage = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setFile({
          selectedImage: event.target.result,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEditUser = async () => {
    try {
      const response = await API.put("/user", detailProfile);
      toastify("success", response?.data?.message);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    dispatch(getActiveUser());
  };
  const handleSubmitImage = async () => {
    if (file?.file != null) {
      try {
        let formData = new FormData();
        formData.append("file", file?.file);
        const response = await API.put("/user/upload", formData);
        toastify("success", response?.data?.message);
        setFile({ file: null, selectedImage: null });
      } catch (error) {
        toastify("error", error?.response?.data?.message);
      }
    }
    setOpen(false);
    dispatch(getActiveUser());
  };
  const handleOpen = () => setOpen(!open);
  const handleChange = (e) => {
    setDetailProfile({
      ...detailProfile,
      [e?.target?.name]: e?.target?.value,
    });
  };
  useEffect(() => {
    if (activeUser?.store?.length > 0) {
      setDetailProfile({
        ...detailProfile,
        name: activeUser?.name,
        phone_number: activeUser?.phone_number,
        email: activeUser?.email,
        description: activeUser?.store[0]?.description,
      });
    }
  }, []);
  return (
    <>
      <div className="border-b flex justify-between items-center border-gray-300 py-3 lg:w-full">
        <div>
          <h1 className="font-semibold text-2xl leading-relaxed">My Profile</h1>
          <p className="text-gray-500">Manage your profile information</p>
        </div>
        {openMenu ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 lg:hidden"
            onClick={handleOpenMenu}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 lg:hidden"
            onClick={handleOpenMenu}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
      </div>
      <div className="flex flex-col-reverse items-center lg:items-start lg:flex-row justify-between py-10">
        <div className="w-full lg:w-[520px] flex flex-col gap-y-5 text-end pr-18">
          <div className="flex lg:flex-row flex-col lg:gap-10 gap-3 items-start justify-start lg:justify-end lg:items-center">
            <label htmlFor="" className="text-gray-400 lg:text-end">
              Name
            </label>
            <div className="w-full lg:w-2/3">
              <Input
                onChange={(e) => handleChange(e)}
                label="Name"
                value={detailProfile?.name}
                name="name"
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col lg:gap-10 gap-3 items-start justify-start lg:justify-end lg:items-center">
            <label htmlFor="" className="text-gray-400 text-end">
              Email
            </label>
            <div className="w-full lg:w-2/3">
              <Input
                onChange={(e) => handleChange(e)}
                label="Email"
                value={detailProfile?.email}
                name="email"
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col lg:gap-10 gap-3 items-start justify-start lg:justify-end lg:items-center">
            <label htmlFor="" className="text-gray-400 text-end">
              Phone Number
            </label>
            <div className="w-full lg:w-2/3">
              <Input
                onChange={(e) => handleChange(e)}
                label="Phone Number"
                value={detailProfile?.phone_number}
                name="phone_number"
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col lg:gap-10 gap-3 items-start justify-start lg:justify-end lg:items-center">
            <label htmlFor="" className="text-gray-400 text-end">
              Store description
            </label>
            <div class="relative w-full lg:w-[350px]">
              <Textarea
                color="gray"
                label="Description"
                name="description"
                value={detailProfile?.description}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <button
            onClick={handleEditUser}
            className="bg-main-red text-white w-1/3 lg:w-1/3 lg:mx-auto py-2 rounded-md mt-6"
          >
            Save Profile
          </button>
        </div>
        <div className="hidden lg:block bg-gray-200 h-0 lg:h-[150px] w-0.5"></div>
        <div className="lg:w-[200px] items-center flex flex-col lg:pr-20">
          <img
            src={activeUser?.image ? activeUser?.image : defaultFoto}
            alt=""
            className="w-28 h-28 rounded-full"
          />
          <button
            onClick={handleOpen}
            className="border-2 border-gray-200 rounded-full py-1 px-3 mt-5 text-sm text-gray-500"
          >
            Select image
          </button>
          <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Upload photo</DialogHeader>
            <DialogBody>
              <div
                className="w-full h-[350px] relative"
                style={{
                  backgroundImage: `url(${file?.selectedImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!file?.selectedImage && (
                  <p className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2">
                    Choose file
                  </p>
                )}
                <input
                  type="file"
                  className="w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleChangeImage(e)}
                />
              </div>
            </DialogBody>
            <DialogFooter>
              <Button onClick={handleSubmitImage}>Submit</Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>
    </>
  );
}
