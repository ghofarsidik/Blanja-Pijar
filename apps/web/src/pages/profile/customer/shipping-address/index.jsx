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
import axios from "axios";
import API from "../../../../configs/api";

export default function ShippingAddress({ activeUser }) {
  console.log(activeUser);
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
    primary: false,
    user_id: activeUser?.ID,
  });
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
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // console.log(newAddress);
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
      <div className="border-b border-gray-300 py-3">
        <h1 className="font-semibold text-2xl leading-relaxed">
          Choose another address
        </h1>
        <p className="text-gray-500">Manage your shipping address</p>
      </div>
      <div className="flex flex-col gap-10 px-20 py-10">
        <div
          onClick={handleOpen}
          className="cursor-pointer border-dashed border-2 border-gray-300 w-full h-[80px] flex justify-center items-center"
        >
          <h1 className="font-semibold text-xl text-gray-400">
            Add new address
          </h1>
        </div>
        <form action={onSubmit}>
          <Dialog open={open} handler={handleOpen} size="md">
            <DialogHeader>
              <div className="flex flex-col gap-5 w-full">
                <h1>Add new address</h1>
                <div className="w-full py-4 flex px-[50px]">
                  <Stepper
                    activeLineClassName="bg-red-500"
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                  >
                    <Step
                      onClick={() => setActiveStep(0)}
                      activeClassName="bg-red-500"
                      completedClassName="bg-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#fff"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                    </Step>
                    <Step
                      onClick={() => setActiveStep(1)}
                      activeClassName="bg-red-500"
                      completedClassName="bg-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#fff"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                    </Step>
                  </Stepper>
                </div>
              </div>
            </DialogHeader>
            <DialogBody>
              <div className={`${activeStep === 0 ? "block" : "hidden"}`}>
                <Maps position={position} setPosition={setPosition} />
              </div>
              <div className={`${activeStep === 1 ? "block" : "hidden"}`}>
                <div className="w-full px-10">
                  <label htmlFor="">
                    Save label address as (ex: home, office)
                  </label>
                  <input
                    name="label"
                    value={newAddress?.label}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, label: e.target.value })
                    }
                    type="text"
                    className="w-full border border-gray-400 px-3 py-2 rounded-md outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 px-10 pt-3">
                  {FORM?.map((item) => (
                    <div>
                      <label htmlFor="" className="text-sm ">
                        {item?.label}
                      </label>
                      <input
                        value={newAddress[item?.name]}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            [e?.target?.name]: e?.target?.value,
                          })
                        }
                        name={item?.name}
                        type="text"
                        className="w-full border border-gray-400 px-3 py-2 rounded-md outline-none"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 px-10 pt-5">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        primary: e?.target?.checked,
                      })
                    }
                  />
                  <p className="text-gray-700 text-sm">
                    Make it the primary address
                  </p>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <div className="w-full">
                <div className="mt-16 flex justify-between px-20">
                  <Button
                    onClick={handlePrev}
                    disabled={isFirstStep}
                    variant="outlined"
                  >
                    Prev
                  </Button>
                  <Button onClick={handleNext} color="red" type="submit">
                    {isLastStep ? "Submit" : "Next"}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </Dialog>
        </form>
        <div className="-mt-14 max-h-[300px] overflow-y-scroll flex flex-col gap-y-3">
          {activeUser?.address?.map((item) => (
            <div
              className={`${
                item?.primary === true && "bg-main-red/20"
              } border border-red-500 h-[150px] w-full px-3 py-2`}
              key={item?.id}
            >
              <h1>{item?.received_name}</h1>
              <p className="text-gray-600 my-1">
                {item?.address} {item?.postal_code}
              </p>
              <button className="text-red-400 font-semibold mt-5">
                Change address
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
