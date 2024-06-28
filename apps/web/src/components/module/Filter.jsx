import {
  Dialog,
  DialogBody,
  DialogHeader,
  Option,
  Select,
} from "@material-tailwind/react";
import Close from "../../assets/images/navbar/add.svg";
export const Filter = ({
  stores,
  open,
  handleOpen,
  handleColorClick,
  handleSizeClick,
  handleFilter,
  uniqueColors,
  uniqueSize,
  categories,
  filter,
  setFilter,
}) => {
  return (
    <Dialog open={open} handler={handleOpen} size="sm">
      <DialogHeader>
        <div className="flex gap-2 items-center">
          <button onClick={handleOpen}>
            <img src={Close} alt="" />
          </button>
          <p>Filter</p>
        </div>
      </DialogHeader>
      <DialogBody>
        <div className="border-t-2 border-gray-300 pt-3 pb-1">
          <h1 className="font-semibold pb-3 lg:pb-8 text-[#222222] text-lg">
            Colors
          </h1>
          <div className="flex gap-x-2">
            {uniqueColors?.map((item, { color }) => (
              <div
                key={item.ID}
                onClick={() => handleColorClick(color)}
                style={{ backgroundColor: color }}
                className={`${
                  filter?.color?.includes(color) ? "ring-2 ring-gray-700" : ""
                } w-5 h-5 lg:w-9 lg:h-9 rounded-full border border-gray-300 shadow-xl cursor-pointer`}
              ></div>
            ))}
          </div>
        </div>
        <div className="border-t-2 border-gray-300 mt-3 py-3">
          <h1 className="font-semibold pb-3 lg:pb-8 text-[#222222] text-lg">
            Size
          </h1>
          <div className="flex gap-x-2">
            {uniqueSize?.map(({ size }) => (
              <div
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`${
                  filter?.size?.includes(size) ? "bg-main-red text-white" : ""
                }  lg:text-base text-sm w-5 h-5 lg:w-10 lg:h-10 rounded lg:rounded-lg border border-gray-300 shadow-xl cursor-pointer flex justify-center items-center`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t-2 border-gray-300 mt-3 py-3">
          <h1 className="font-semibold pb-3 lg:pb-8 text-[#222222] text-lg">
            Category
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-3 pr-20">
            {categories?.map(({ name }) => (
              <div
                key={name}
                onClick={() => setFilter({ ...filter, category: name })}
                className={`${
                  filter?.category === name ? "bg-main-red text-white" : ""
                } w-24 h-8 text-sm lg:text-base lg:w-28 lg:h-10 rounded-lg border border-gray-300 shadow-xl cursor-pointer flex justify-center items-center`}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t-2 border-gray-300 mt-3 py-3">
          <h1 className="font-semibold text-[#222222] text-lg pb-1">Store</h1>
          <Select
            variant="standard"
            label="Select store"
            value={filter?.store}
            onChange={(val) => setFilter({ ...filter, store: val })}
          >
            {stores?.map(({ name }) => (
              <Option key={name} value={name}>
                {name}
              </Option>
            ))}
          </Select>
        </div>
      </DialogBody>
      <div className="flex gap-x-8 justify-center py-2">
        <button
          onClick={handleOpen}
          className="bg-white lg:w-1/3 text-center py-2 px-10 text-black border border-gray-500 rounded-full"
        >
          Discard
        </button>
        <button
          onClick={handleFilter}
          className="bg-main-red lg:w-1/3 text-center py-2 px-10 text-white font-semibold rounded-full"
        >
          Apply
        </button>
      </div>
    </Dialog>
  );
};
