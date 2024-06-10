import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Step,
  Stepper,
} from "@material-tailwind/react";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "./map.module.css";

function LocationMarker({ position, setPosition }) {
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={eventHandlers}
      ref={markerRef}
    >
      <Popup>You are here</Popup>
    </Marker>
  );
}
export default function ShippingAddress() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [position, setPosition] = useState([51.505, -0.09]);
  const handleOpen = () => setOpen(!open);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
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
        <form action="">
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
                <MapContainer
                  center={position}
                  zoom={13}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker
                    position={position}
                    setPosition={setPosition}
                  />
                </MapContainer>
              </div>

              <div className={`${activeStep === 1 ? "block" : "hidden"}`}>
                <div className="w-full px-10">
                  <label htmlFor="">
                    Save label address as (ex: home, office)
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-400 px-3 py-2 rounded-md outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 px-10 pt-3">
                  <div>
                    <label htmlFor="" className="text-sm ">
                      Recipent's name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-400 px-3 py-2 rounded-md outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="text-sm ">
                      Recipent's telephone number
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-400 px-3 py-2 rounded-md outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="text-sm ">
                      Detail address
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-400 px-3 py-2 rounded-md outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="text-sm ">
                      Postal code
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-400 px-3 py-2 rounded-md outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="text-sm ">
                      City or subdisctric
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-400 px-3 py-2 rounded-md outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 px-10 pt-5">
                  <input type="checkbox" />
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
                  <Button onClick={handleNext} color="red">
                    {isLastStep ? "Submit" : "Next"}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </Dialog>
        </form>
        <div className="border border-red-500 h-[150px] w-full px-3 py-2">
          <h1>Andreas Jane</h1>
          <p className="text-gray-600 my-1">
            Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten
            Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja,
            Kab. Banyumas, 53181
          </p>
          <button className="text-red-400 font-semibold mt-5">
            Change address
          </button>
        </div>
      </div>
    </>
  );
}
