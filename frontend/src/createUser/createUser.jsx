import React, { useState, useEffect } from "react";
import "./createUser.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { notification } from "antd";
import Navbar from "../NavBar/Navbar";

const User = () => {
  const { id } = useParams();
  const [userImage, setuserImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
  const [gender, setGender] = useState("male");
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("http://localhost:5200/view/user/" + id).then((response) => {
      const { data } = response;
      setName(data.name);
      setGender(data.gender);
      setEmail(data.email);
      setmobile(data.mobile);
      setCategory(data.category);
    });
  }, [id]);

  const fileChange = (event) => {
    const files = event.target.files[0];
    setuserImage(files);
  };

  const changeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    if (!name) {
      notification.error({
        message: "Registration Failed",
        description: "Name is required",
      });
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      notification.error({
        message: "Registration Failed",
        description: "Name should contain only letters and spaces",
      });
      return;
    }
    if (!email) {
      notification.error({
        message: "Registration Failed",
        description: "Email is required",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      notification.error({
        message: "Registration Failed",
        description: "Email is not valid",
      });
      return;
    }

    if (!mobile) {
      notification.error({
        message: "Registration Failed",
        description: "Mobile Number is required",
      });
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      notification.error({
        message: "Registration Failed",
        description: "Mobile number is not valid",
      });
      return;
    }
    if (!category) {
      notification.error({
        message: "Registration Failed",
        description: "Please select category",
      });
      return;
    }

    setShowModal(true);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", name);
      data.append("gender", gender);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("category", category);
      if (userImage) {
        data.append("profileImage", userImage);
      }
      if (id) {
        await axios.put("http://localhost:5200/view/" + id, data);
      } else {
        await axios.post("http://localhost:5200/view/newuser", data);
        notification.success({
          message: "User Created",
          description: "Creation Successfull",
        });
      }
      navigate("/view");
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Failed",
        description: "Creation Failed",
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Navbar />
      <form id="loginForm" className="mb-1 mx-auto col-10 col-md-8 col-lg-6">
        <div className="col-md-4 formContent">
          <div className="mb-2 input">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2 input">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2 input">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              className="form-control"
              id="mobile"
              placeholder="Mobile *"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
            />
          </div>
          <div id="gender" className="mb-2">
            <label>Gender</label>
            <div className="form-check form-check-inline male">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline female">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>
          <div className="mb-2 ">
            <label>Category</label>
            <select
              className="form-control"
              name="category"
              id="category"
              value={category}
              onChange={changeCategory}
            >
              <option value="" disabled selected hidden>
                Select your Category
              </option>
              <option value="General">General</option>
              <option value="SC/ST">SC/ST</option>
              <option value="OBC">OBC</option>
            </select>
          </div>

          <div className="form-check photo mb-2">
            <label className="header">Profile Photo:</label>
            <input
              id="file"
              type="file"
              name="profile_photo"
              placeholder="Photo"
              accept="image/jpeg, image/png"
              onChange={fileChange}
            />
          </div>

          <div>
            {userImage && (
              <img
                src={URL.createObjectURL(userImage)}
                alt="Profile"
                className="profile-image"
              />
            )}
          </div>

          <button
            className="previewbutton"
            type="submit"
            onClick={handlePreview}
          >
            Preview
          </button>
        </div>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-title">Preview</h2>
            <div className="modal-details">
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Gender:</strong> {gender}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>mobile:</strong> {mobile}
              </p>
              <p>
                <strong>Category:</strong> {category}
              </p>
              <p>
                <strong>Profile Picture:</strong> <br />{" "}
                <img
                  src={userImage ? URL.createObjectURL(userImage) : ""}
                  alt="Profile"
                  className="profile-image"
                />
              </p>
            </div>
            <div className="modal-buttons">
              <button
                className="modal-button cancel-button"
                onClick={closeModal}
              >
                Close
              </button>
              <button className="modal-button btn-primary" onClick={submitForm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
