import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Step,
  Stepper,
} from "@material-tailwind/react";
import { Maps } from "../../../../components/module/Maps";

export default function ModalAddress({
  open,
  handleOpen,
  handleNext,
  handlePrev,
  activeStep,
  setActiveStep,
  setIsFirstStep,
  setIsLastStep,
  position,
  setPosition,
  FORM,
  setNewAddress,
  newAddress,
  isFirstStep,
  isLastStep,
  onSubmit,
  title,
}) {
  return (
    <form action={onSubmit}>
      <Dialog open={open} handler={handleOpen} size="md">
        <DialogHeader>
          <div className="flex flex-col gap-5 w-full">
            <h1>{title}</h1>
            <div className=" w-full lg:py-4 flex px-5 lg:px-[50px]">
              <Stepper
                activeLineClassName="bg-red-500 "
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
              >
                <Step
                  onClick={() => setActiveStep(0)}
                  activeClassName="bg-red-500"
                  completedClassName="bg-red-500"
                  className="w-7 h-7 lg:w-10 lg:h-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#fff"
                    className="size-4 lg:size-6"
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
                  className="w-7 h-7 lg:w-10 lg:h-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#fff"
                    className="size-4 lg:size-6"
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
            <div className="w-full -mt-4 lg:-mt-0 lg:px-10">
              <label htmlFor="">Save label address as (ex: home, office)</label>
              <input
                name="label"
                value={newAddress?.label}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, label: e.target.value })
                }
                type="text"
                className="w-full border border-gray-400 px-3 lg:py-2 rounded-md outline-none"
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-x-4 gap-y-1 lg:px-10 lg:pt-3">
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
                    className="w-full border border-gray-400 px-3 lg:py-2 rounded-md outline-none"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 px-2 lg:px-10 pt-2 lg:pt-5">
              <input
                type="checkbox"
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    primary_address: e?.target?.checked,
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
            <div className="lg:mt-16 flex justify-between px-5 lg:px-20">
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
  );
}
