import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../../contexts/AuthProvider";

const BookingModal = ({ showModal, setShowModal, selectedProduct }) => {
  const { title, resalePrice, image, _id } = selectedProduct;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;

    const mobile = form.mobile.value;
    const location = form.location.value;

    const booking = {
      product: title,
      price: resalePrice,
      buyer: user.displayName,
      buyerEmail: user.email,
      mobile,
      location,
      image,
      productId: _id,
    };
    console.log(booking);
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          swal(
            "Booking confirmed successfully!",
            "Please pay as soon as possible!",
            "success"
          );
          navigate("/dashboard/myOrders");
        } else if (data.alreadyBooked) {
          swal("", `${data.message}`, "error");
        } else {
          swal("Something went wrong!", "", "error");
        }
        setShowModal(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <React.Fragment>
        <Modal
          show={showModal}
          size="lg"
          popup={true}
          onClose={() => setShowModal(false)}
        >
          <div>
            <Modal.Header />
            <Modal.Body>
              <div className="space-y-4 px-4 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                <form onSubmit={handleBooking} className="space-y-3 ">
                  {/* name */}
                  <div>
                    <TextInput
                      id="name"
                      type="text"
                      defaultValue={user?.displayName}
                      readOnly
                      name="name"
                      shadow={true}
                    />
                  </div>
                  {/* email */}
                  <div>
                    <TextInput
                      id="email"
                      type="email"
                      defaultValue={user?.email}
                      readOnly
                      name="email"
                      shadow={true}
                    />
                  </div>

                  {/* item name */}
                  <div>
                    <TextInput
                      id="itemName"
                      type="text"
                      defaultValue={title}
                      readOnly
                      name="itemName"
                      shadow={true}
                    />
                  </div>
                  {/* price */}
                  <div>
                    <div className="mb-1 block">
                      <Label htmlFor="price" value="Price($)" />
                    </div>
                    <TextInput
                      id="price"
                      type="text"
                      defaultValue={resalePrice}
                      readOnly
                      name="price"
                      shadow={true}
                    />
                  </div>
                  {/* mobile no */}
                  <div>
                    <TextInput
                      id="mobile"
                      type="text"
                      name="mobile"
                      placeholder="Mobile Number"
                      shadow={true}
                      required
                    />
                  </div>
                  {/* Meeting Location */}
                  <div>
                    <TextInput
                      id="location"
                      type="text"
                      name="location"
                      placeholder="Meeting Location "
                      shadow={true}
                      required
                    />
                  </div>

                  <div className="w-full ">
                    <Button
                      className="w-full"
                      gradientMonochrome="purple"
                      type="submit"
                    >
                      Book This Item Now
                    </Button>
                  </div>
                </form>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default BookingModal;
