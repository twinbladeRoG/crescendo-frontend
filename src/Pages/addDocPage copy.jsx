import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Utils/Utils";
import { Container, Form, ButtonGroup, Button } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";

export default function AddDocPage() {
  // Auth Checking start
  let navigate = useNavigate();
  useEffect(() => {
    const authStatus = isAuthenticated();
    if (!authStatus) {
      navigate("/login");
    }
  }, []);
  // Auth Checking end
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [contactAlt, setContactAlt] = useState("");
  const [contactEm, setContactEm] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [doctorType, setDoctorType] = useState("")
  const [registration, setRegistration] = useState("");
  const [membership, setMembership] = useState("");
  const [gender, setGender] = useState("");
  const [foodPref, setFoodPref] = useState("");

  return (
    <>
      <Container>
        <AiFillHome
          className="float-end"
          size={30}
          color={"green"}
          onClick={() => navigate("/")}
        />
        <h1>Onboard Doctor</h1>
      </Container>
      <Container>
        <Form
          style={{
            backgroundColor: "white",
            margin: "1px",
            padding: "5px",
            border: "1px solid #8c918c",
            borderRadius: "5px",
          }}
        >
          <Form.Text className="text-muted">
            Fill out the form below to add a new doctor to your list.
          </Form.Text>

          <Form.Group className="mb-3">
            <Form.Control
              type="fname"
              placeholder="First Name"
              style={{ borderColor: "#237547" }}
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="mname"
              placeholder="Middle Name"
              style={{ borderColor: "#237547" }}
              value={mname}
              onChange={(e) => setMname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="lname"
              placeholder="Last Name"
              style={{ borderColor: "#237547" }}
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              style={{ borderColor: "#237547" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="contact"
              placeholder="Contact Number"
              style={{ borderColor: "#237547" }}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="ALT contact"
              placeholder="Alternate Contact Number"
              style={{ borderColor: "#237547" }}
              value={contactAlt}
              onChange={(e) => setContactAlt(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="contact"
              placeholder="Emergency Contact Number"
              style={{ borderColor: "#237547" }}
              value={contactEm}
              onChange={(e) => setContactEm(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="address"
              placeholder="Address"
              style={{ borderColor: "#237547", height: "70px" }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="district"
              placeholder="district"
              required
              style={{ borderColor: "#237547" }}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="pincode"
              placeholder="pincode"
              required
              style={{ borderColor: "#237547" }}
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </Form.Group>
          <Form.Label>Registration Type</Form.Label>
          <Form.Group className="mb-3">
            <ButtonGroup>
              <Form.Check
                type="radio"
                label="WBS"
                checked={doctorType === "w"}
                onChange={() => {
                  setDoctorType("w");
                }}
              />
              <Form.Check
                type="radio"
                label="Others"
                checked={doctorType === "o"}
                onChange={() => {
                  setDoctorType("o");
                }}
              />
            </ButtonGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="registration"
              placeholder="Doctor Registration Number"
              style={{ borderColor: "#237547" }}
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
            />
          </Form.Group>

          <Form.Label>Gender</Form.Label>
          <Form.Group className="mb-3">
            <ButtonGroup>
              <Form.Check
                type="radio"
                label="Male"
                checked={gender === "m"}
                onChange={() => {
                  setGender("m");
                }}
              />
              <Form.Check
                type="radio"
                label="Female"
                checked={gender === "f"}
                onChange={() => {
                  setGender("f");
                }}
              />
              <Form.Check
                type="radio"
                label="Non-binary"
                checked={gender === "b"}
                onChange={() => {
                  setGender("b");
                }}
              />
            </ButtonGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="membership"
              placeholder="Membership No"
              style={{ borderColor: "#237547" }}
              value={membership}
              onChange={(e) => setMembership(e.target.value)}
            />
          </Form.Group>

          <Form.Label>Food Preference</Form.Label>
          <Form.Group className="mb-3">
            <ButtonGroup>
              <Form.Check
                type="radio"
                label="Veg"
                checked={foodPref === "v"}
                onChange={() => {
                  setFoodPref("v");
                }}
              />
              <Form.Check
                type="radio"
                label="Non-Veg"
                checked={foodPref === "n"}
                onChange={() => {
                  setFoodPref("n");
                }}
              />
            </ButtonGroup>
          </Form.Group>
          <Button
            variant="success"
            style={{ width: "100%" }}
            onClick={() =>
              handleSubmit(
                fname,
                mname,
                lname,
                email,
                contact,
                address,
                registration,
                gender,
                membership,
                foodPref,
                navigate
              )
            }
          >
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

function handleSubmit(
  fname,
  mname,
  lname,
  email,
  contact,
  address,
  registration,
  gender,
  membership,
  foodPref,
  navigate
) {
  console.log(
    fname,
    mname,
    lname,
    email,
    contact,
    address,
    registration,
    gender,
    membership,
    foodPref
  );
  alert("Added Successfully")
  navigate("/");
}
