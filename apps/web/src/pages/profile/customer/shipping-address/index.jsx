import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Step,
  Stepper,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Maps } from "../../../../components/module/Maps";
import API from "../../../../configs/api";
import ModalAddress from "./modalAddress";
import ListAddress from "./listAddress";

export default function ShippingAddress({
  activeUser,
  handleOpenMenu,
  openMenu,
}) {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [newAddress, setNewAddress] = useState({
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
  // console.log(newAddress);
  const [position, setPosition] = useState([51.505, -0.09]);
  const handleOpen = () => setOpen(!open);
  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
    activeStep === 1 && onSubmit();
  };
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const onSubmit = async () => {
    try {
      const res = await API.post(`/address`, newAddress, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    handleOpen();
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
      latitude: position?.lat,
      longitude: position?.lng,
    });
  }, [position]);
  return (
    <>
      <div className="border-b flex justify-between border-gray-300 py-3">
        <div>
          <h1 className="font-semibold text-2xl leading-relaxed">
            Choose another address
          </h1>
          <p className="text-gray-500">Manage your shipping address</p>
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
      <div className="flex flex-col gap-10 lg:px-20 py-10">
        <div
          onClick={handleOpen}
          className="cursor-pointer border-dashed border-2 border-gray-300 w-full h-[80px] flex justify-center items-center"
        >
          <h1 className="font-semibold text-xl text-gray-400">
            Add new address
          </h1>
        </div>
        <div className="mb-10">
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
            title={"Add new address"}
          />
        </div>
        <ListAddress activeUser={activeUser} />
      </div>
    </>
  );
}
