import { useEffect, useState } from "react";
import API from "../../../../configs/api";
import ModalAddress from "./modalAddress";
import { toastify } from "../../../../components/base/toastify";
import { Checkbox, Switch } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { getActiveUser } from "../../../../configs/redux/features/userSlice";

export default function ListAddress({ activeUser }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [newAddress, setNewAddress] = useState({
    ID: "",
    label: "",
    received_name: "",
    contact_number: "",
    address: "",
    postal_code: "",
    latitude: "",
    longitude: "",
    primary_address: null,
    city: "",
    user_id: activeUser?.ID,
  });
  const [position, setPosition] = useState([null, null]);
  const handleOpen = (lat, lon, item) => {
    setOpen(!open);
    setPosition([lat, lon]);
    // console.log(item);
    setNewAddress({
      ID: item?.ID,
      label: item?.label,
      received_name: item?.received_name,
      contact_number: item?.contact_number,
      address: item?.address,
      postal_code: item?.postal_code,
      primary_address: item?.primary_address,
      city: item?.city,
    });
  };
  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
    activeStep === 1 && onSubmit();
  };
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const onSubmit = async () => {
    try {
      const res = await API.put(`/address/${newAddress?.ID}`, newAddress);
      toastify("success", res?.data?.message);
      dispatch(getActiveUser());
    } catch (error) {
      console.log(error);
    }
    handleOpen();
  };
  const handleCheckPrimary = async (ID, check) => {
    try {
      console.log(check);
      const res = await API.put(`/address/${ID}`, {
        primary_address: check,
      });
      toastify("success", res?.data?.message);
      dispatch(getActiveUser());
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const FORM = [
    {
      label: "Recipient’s name)",
      name: "received_name",
    },
    {
      label: "Recipient's telephone number",
      name: "contact_number",
    },
    {
      label: "Address",
      name: "address",
    },
    {
      label: "Postal code",
      name: "postal_code",
    },
    {
      label: "City or Subdistrict",
      name: "city",
    },
  ];
  useEffect(() => {
    setNewAddress({
      ...newAddress,
      latitude: position?.[0],
      longitude: position?.[1],
    });
  }, [position]);
  return (
    <div className="-mt-20 lg:max-h-[300px] overflow-y-scroll lg:px-3 flex flex-col gap-y-3">
      {activeUser?.address?.map((item) => (
        <div
          className={`${
            item?.primary === true && "bg-main-red/20"
          } border border-red-500 lg:h-[250px] w-full px-3 py-2 lg:py-4`}
          key={item?.id}
        >
          <h1>{item?.received_name}</h1>
          <p className="text-gray-600 my-1 text-sm lg:text-base">
            {item?.address} {item?.postal_code}
          </p>
          <div className="flex items-center justify-between lg:mt-5">
            <button
              className="text-red-400 font-semibold text-xs lg:text-base"
              onClick={() => handleOpen(item?.latitude, item?.longitude, item)}
            >
              Change address
            </button>
            <div className="flex lg:gap-x-1 items-center">
              <p className="text-red-400 font-semibold text-xs lg:text-base">
                Change to primary address
              </p>
              <Checkbox
                value={item?.primary}
                onChange={(e) => handleCheckPrimary(item?.ID, e?.target?.checked)}
                color="indigo"
                defaultChecked={item?.primary === true}
              />
            </div>
          </div>
        </div>
      ))}
      <ModalAddress
        FORM={FORM}
        activeStep={activeStep}
        handleNext={handleNext}
        handleOpen={handleOpen}
        handlePrev={handlePrev}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        newAddress={newAddress}
        onSubmit={onSubmit}
        open={open}
        position={position}
        setActiveStep={setActiveStep}
        setIsFirstStep={setIsFirstStep}
        setIsLastStep={setIsLastStep}
        setNewAddress={setNewAddress}
        setPosition={setPosition}
        title={"Update your address"}
      />
    </div>
  );
}
