import {
  Input,
  Option,
  Radio,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import API from "../../../../configs/api";
import Box from "../../../../assets/images/profile/seller/box 5.png";
import { ModalAddProduct } from "./modalAddProduct";
import { useSelector } from "react-redux";
import { toastify } from "../../../../components/base/toastify";

export default function AddProduct() {
  const [categories, setCategories] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { activeUser } = useSelector((state) => state.user);
  const [file, setFile] = useState({
    selectedImage: [],
    file: [],
  });
  const [sizes, setSizes] = useState([
    {
      product_id: null,
      size: "",
    },
  ]);
  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const handleChangeImage = (e) => {
    const files = Array.from(e.target.files);
    const newSelectedImages = [];
    const newFiles = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        newSelectedImages.push(event.target.result);
        newFiles.push(file);

        // Set the state after reading all files
        if (newSelectedImages.length === files.length) {
          setFile((prevState) => ({
            selectedImage: [...prevState.selectedImage, ...newSelectedImages],
            file: [...prevState.file, ...newFiles],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragStart = (index) => (e) => {
    e.dataTransfer.setData("imageIndex", index);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const index = e.dataTransfer.getData("imageIndex");
    if (index) {
      const newSelectedImage = [...file.selectedImage];
      const [draggedImage] = newSelectedImage.splice(index, 1);
      newSelectedImage.unshift(draggedImage);

      setFile((prevState) => ({
        ...prevState,
        selectedImage: newSelectedImage,
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleRemoveImage = (index) => {
    setFile((prevState) => {
      const newSelectedImages = [...prevState.selectedImage];
      const newFiles = [...prevState.file];
      newSelectedImages.splice(index, 1);
      newFiles.splice(index, 1);
      return {
        ...prevState,
        selectedImage: newSelectedImages,
        file: newFiles,
      };
    });
  };
  const getCategories = async () => {
    try {
      const res = await API.get(`/categories`);
      setCategories(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: null,
    description: "",
    stock: null,
    condition: "",
    store_id: "",
    category_id: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddProduct((prevState) => ({
      ...prevState,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };
  const handleAddProduct = async () => {
    try {
      const res = await API.post("/product", addProduct);
      if (res?.status === 201) {
        let formData = new FormData();
        file.file.forEach((file, index) => {
          formData.append(`file`, file);
        });
        await API.post(
          `/product/uploadServer/${res?.data?.data?.ID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      toastify(res?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
    if (activeUser?.store) {
      setAddProduct({ ...addProduct, store_id: activeUser?.store[0]?.ID });
    }
  }, []);
  return (
    <main className="relative flex flex-col gap-y-5">
      <div className="bg-white lg:w-[1000px] lg:py-3 lg:px-5 lg:h-[200px] lg:rounded-md">
        <h1 className="lg:font-semibold lg:text-xl lg:border-b-2 lg:border-gray-300 lg:pb-8">
          Inventory
        </h1>
        <div className="lg:w-1/3 lg:py-6">
          <Input
            label="Name of product"
            name="name"
            value={addProduct?.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="bg-white lg:w-[1000px] lg:py-3 lg:px-5 lg:h-[300px] lg:rounded-md">
        <h1 className="lg:font-semibold lg:text-xl lg:border-b-2 lg:border-gray-300 lg:pb-8">
          Item details
        </h1>
        <div className="lg:full lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-5 lg:py-6">
          <Input
            label="Unit price"
            name="price"
            type="number"
            value={addProduct?.price}
            onChange={(e) => handleChange(e)}
          />
          <Input
            label="Unit stock"
            name="stock"
            type="number"
            value={addProduct?.stock}
            onChange={(e) => handleChange(e)}
          />
          {categories && (
            <Select
              label="Select category"
              value={addProduct?.category_id}
              onChange={(val) =>
                setAddProduct({ ...addProduct, category_id: val })
              }
            >
              {categories?.map((item) => (
                <Option value={item?.ID}>{item?.name}</Option>
              ))}
            </Select>
          )}
          <Input
            label="Size"
            name="size"
            type="text"
            value={addProduct?.stock}
            onChange={(e) => handleSizeChange(e)}
          />
          <div className="flex gap-3">
            <Radio
              name="color"
              color="red"
              label="New"
              value={"new"}
              onChange={(e) =>
                setAddProduct({
                  ...addProduct,
                  condition: e?.target?.value,
                })
              }
              checked={addProduct?.condition === "new"}
            />
            <Radio
              name="color"
              color="red"
              label="Used"
              value={"used"}
              onChange={(e) =>
                setAddProduct({
                  ...addProduct,
                  condition: e?.target?.value,
                })
              }
              checked={addProduct?.condition === "used"}
            />
          </div>
        </div>
      </div>
      <div className="bg-white lg:w-[1000px] lg:py-3 lg:px-5 lg:h-full lg:rounded-md">
        <h1 className="lg:font-semibold lg:text-xl lg:border-b-2 lg:border-gray-300 lg:pb-8">
          Photo of goods
        </h1>
        <div className="px-5 py-3">
          <div className="lg:border-4 lg:border-dashed lg:h-[350px] lg:mt-5 lg:flex lg:flex-col lg:py-7 lg:px-5">
            <div className="flex gap-x-10 mt-4">
              <div
                className="lg:relative lg:h-[200px] lg:w-[200px] lg:bg-[#D4D4D4] lg:rounded-md lg:flex lg:justify-center lg:items-center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {file.selectedImage.length > 0 ? (
                  <div
                    className="lg:h-[200px] lg:w-[200px] lg:bg-cover lg:bg-center lg:rounded-md"
                    style={{ backgroundImage: `url(${file.selectedImage[0]})` }}
                  />
                ) : (
                  <img src={Box} alt="" />
                )}
                <p className="absolute -bottom-8 text-gray-500 font-semibold">
                  Main foto
                </p>
              </div>
              <div className="lg:max-w-[600px] flex gap-x-3 lg:overflow-x-auto py-3">
                {file.selectedImage.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer lg:w-[130px] lg:h-[130px] lg:bg-cover lg:bg-center lg:rounded-md lg:flex lg:justify-center lg:items-center flex-shrink-0"
                    style={{ backgroundImage: `url(${image})` }}
                    draggable
                    onDragStart={handleDragStart(index + 1)}
                  >
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index + 1);
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t py-5 border-gray-300 mt-10 flex items-center justify-center">
              <button
                onClick={handleOpen}
                className="mx-auto border text-gray-500 font-semibold border-gray-300 rounded-full px-5 py-1"
              >
                Upload photo
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white lg:w-[1000px] lg:py-3 lg:px-5 lg:h-full lg:rounded-md">
        <h1 className="lg:font-semibold lg:text-xl lg:border-b-2 lg:border-gray-300 lg:pb-8">
          Descriptions
        </h1>
        <div className="px-5 py-3">
          <Textarea
            label="Description"
            className="lg:h-[300px]"
            name="description"
            value={addProduct?.description}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <button
        className="absolute -bottom-20 bg-main-red py-3 px-10 rounded-full text-white right-2"
        onClick={handleAddProduct}
      >
        Sell
      </button>
      <ModalAddProduct
        handleChangeImage={handleChangeImage}
        handleOpen={handleOpen}
        open={open}
      />
    </main>
  );
}
