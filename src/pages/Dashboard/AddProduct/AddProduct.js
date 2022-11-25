import { useQuery } from "@tanstack/react-query";
import {
  Button,
  FileInput,
  Label,
  Radio,
  Select,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // getting the categories
  const { data: categories = [] } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/categories");
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  const errorStyle = "text-red-500 font-semibold text-xs mt-1";
  const [addProductError, setAddProductError] = useState("");
  const [isAddProductLoading, setIsAddProductLoading] = useState(false);

  // handling add product
  const handleAddProduct = (data) => {
    setIsAddProductLoading(true);
    const {
      title,
      img,
      category,
      resale,
      original,
      location,
      timeUsed,
      mobile,
      description,
      condition,
    } = data;

    // console.log(data);
    // if (1) {
    //   setIsAddProductLoading(false);
    //   return;
    // }

    // getting the category id from category title
    const categoryObject = categories.find((ct) => ct.title === category);
    const categoryId = categoryObject._id;

    // getting the time of posting the ad
    const date = new Date();

    // handling the image file
    const imgbbKey = process.env.REACT_APP_imgagebb_key;
    const formData = new FormData();
    const image = img[0];
    formData.append("image", image);

    fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const image = imgData.data.url;

        const product = {
          title,
          image,
          categoryId,
          date,
          resalePrice: resale,
          originalPrice: original,
          location,
          timeUsed,
          sellerEmail: user.email,
          sellerName: user.displayName,
          mobile,
          description,
          condition,
          soldStatus: false,
        };

        // adding the ad in database
        fetch("http://localhost:5000/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(product),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
              toast.success("Your product has been added successfully");
              setIsAddProductLoading(false);
              navigate("/dashboard/myProducts");
            }
          })
          .catch((error) => {
            console.error(error);
            setAddProductError(error.message);
            setIsAddProductLoading(false);
          });

        setIsAddProductLoading(false);
      });
  };

  return (
    <div>
      <div className="dark:bg-slate-600  py-10">
        <div className="mx-5 md:w-1/2 md:mx-auto mt-10 border p-5 pb-10 rounded-lg shadow-xl mb-10">
          <div>
            <h3 className="text-3xl text-center font-semibold mb-4 dark:text-slate-200">
              Add A Product
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(handleAddProduct)}
            className="flex flex-col gap-4 text-left w-10/12 mx-auto"
          >
            {/* name */}
            <div>
              <TextInput
                id="title"
                type="text"
                placeholder="Your book title"
                {...register("title", {
                  required: "Title is required",
                })}
                shadow={true}
              />
              {errors.name && (
                <p className={errorStyle}>{errors.name?.message}</p>
              )}
            </div>

            {/* photo */}
            <div id="fileUpload">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload Book Cover" />
              </div>
              <FileInput
                id="file"
                {...register("img", { required: "Photo is required" })}
                accept="image/*"
              />
              {errors.img && (
                <p className={errorStyle}>{errors.img?.message}</p>
              )}
            </div>

            {/* image url
            <div>
              <TextInput
                id="title"
                type="text"
                placeholder="Image Url"
                {...register("image", {
                  required: "image is required",
                })}
                shadow={true}
              />
              {errors.image && (
                <p className={errorStyle}>{errors.image?.message}</p>
              )}
            </div> */}

            {/* category */}
            <div id="select">
              <div className="mb-2 block">
                <Label htmlFor="category" value="Select category" />
              </div>
              <Select
                {...register("category", { required: "Category is required" })}
                id="category"
                required={true}
              >
                {categories.map((category) => (
                  <option key={category._id}>{category.title}</option>
                ))}
              </Select>
              {errors.category && (
                <p className={errorStyle}>{errors.category?.message}</p>
              )}
            </div>

            {/* resale price */}
            <div>
              <TextInput
                id="resale price"
                type="number"
                placeholder="Resale price of your book ($)"
                {...register("resale", {
                  required: "Resale price is required",
                })}
                shadow={true}
              />
              {errors.resale && (
                <p className={errorStyle}>{errors.resale?.message}</p>
              )}
            </div>
            {/* original price */}
            <div>
              <TextInput
                id="original price"
                type="number"
                placeholder="Original price of your book ($)"
                {...register("original", {
                  required: "original price is required",
                })}
                shadow={true}
              />
              {errors.original && (
                <p className={errorStyle}>{errors.original?.message}</p>
              )}
            </div>
            {/* location*/}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="location" value="Location" />
              </div>
              <TextInput
                id="location"
                type="text"
                placeholder="examples- Dhaka/Chittagong/Sylhet"
                {...register("location", {
                  required: "Location is required",
                })}
                shadow={true}
              />
              {errors.location && (
                <p className={errorStyle}>{errors.location?.message}</p>
              )}
            </div>
            {/* years of use */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="timeUsed" value="Time of use" />
              </div>
              <TextInput
                id="timeUsed"
                type="text"
                placeholder="examples- 2 years or 5 months or 29 days"
                {...register("timeUsed", {
                  required: "Time of use is required",
                })}
                shadow={true}
              />
              {errors.timeUsed && (
                <p className={errorStyle}>{errors.timeUsed?.message}</p>
              )}
            </div>

            {/* condition of the book*/}
            <fieldset className="flex gap-4" id="radio">
              <legend className="mb-2 font-semibold text-sm">Condition</legend>
              {/* excellent */}
              <div className="flex items-center gap-2">
                <Radio
                  id="excellent"
                  {...register("condition")}
                  value="excellent"
                  defaultChecked={true}
                />
                <Label htmlFor="excellent">excellent</Label>
              </div>
              {/* good */}
              <div className="flex items-center gap-2">
                <Radio id="good" {...register("condition")} value="good" />
                <Label htmlFor="good">good</Label>
              </div>
              {/* fair */}
              <div className="flex items-center gap-2">
                <Radio id="fair" {...register("condition")} value="fair" />
                <Label htmlFor="fair">fair</Label>
              </div>
            </fieldset>

            {/* description */}
            <div id="description">
              <Textarea
                id="description"
                placeholder="Leave a description..."
                required={true}
                rows={2}
                {...register("description", {
                  required: "At least a short description is required",
                })}
              />
              {errors.description && (
                <p className={errorStyle}>{errors.description?.message}</p>
              )}
            </div>

            {/* years of use */}
            <div>
              <TextInput
                id="mobile"
                type="text"
                placeholder="Mobile no"
                {...register("mobile", {
                  required: "Mobile number is required",
                })}
                shadow={true}
              />
              {errors.mobile && (
                <p className={errorStyle}>{errors.mobile?.message}</p>
              )}
            </div>

            {/* add product error */}
            {addProductError && (
              <p className="text-red-500 text-sm">{addProductError}</p>
            )}

            <Button type="submit">
              {isAddProductLoading ? (
                <Spinner aria-label="Small spinner example" size="sm" />
              ) : (
                "Add Product"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
