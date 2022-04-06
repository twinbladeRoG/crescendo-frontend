import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Utils/Utils";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { AiFillHome } from "react-icons/ai";
import {
  Button,
  Row,
  Col,
  Form,
  Container,
  ButtonGroup,
} from "react-bootstrap";
import endpoints from "../Utils/endpoints";
import axios from "axios";

// ENUMS
const GenderType = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  NON_BINARY: "NON_BINARY",
};

const DoctorType = {
  WBMC: "WBMC",
  OTHERS: "OTHERS",
};

const FoodPreference = {
  NON_VEG: "NON_VEG",
  VEG: "VEG",
};

// FORM VALIDATION SCHEMA
const schema = yup.object({
  firstName: yup.string().required("Required"),
  middleName: yup
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value)),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Must be a valid email").required("Required"),
  contactNumber: yup
    .string()
    .required("Required")
    .matches(/^\d{10}$/, "Must be a valid 10 digit phone number"),
  alternateContactNumber: yup
    .string()
    .matches(/^\d{10}$/, "Must be a valid 10 digit phone number"),
  emergencyContactNumber: yup
    .string()
    .matches(/^\d{10}$/, "Must be a valid 10 digit phone number"),

  address: yup.string().required("Required"),
  district: yup.string().required("Required"),
  pincode: yup
    .string()
    .required("Required")
    .matches(/^[1-9][0-9]{5}$/, "Must be a valid 6 digit pincode"),
  doctorType: yup.string().required("Required"),
  doctorRegistrationNumber: yup.string().required("Required"),
  gender: yup.string().required("Required"),
  foodPreference: yup.string().required("Required"),
});

// MAIN
export default function AddDocPage() {
  // FORM SUBMISSION HANDLER
  function actualHandleSubmit(e, navigate) {
    setIsSubmitting(true);
    let docParams = JSON.parse(JSON.stringify(e));

    docParams["contactNumber"] = {
      countryCode: "+91",
      number: docParams["contactNumber"],
    };
    if (docParams["alternateContactNumber"].length > 1) {
      docParams["alternateContactNumber"] = {
        countryCode: "+91",
        number: docParams["alternateContactNumber"],
      };
    } else {
      docParams["alternateContactNumber"] = undefined;
    }

    if (docParams["emergencyContactNumber"].length > 1) {
      docParams["emergencyContactNumber"] = {
        countryCode: "+91",
        number: docParams["emergencyContactNumber"],
      };
    } else {
      docParams["emergencyContactNumber"] = undefined;
    }
    docParams["doctorRegistrationNumber"] =
      docParams["doctorRegistrationNumber"].toString();

    const jwt = isAuthenticated();

    axios
      .post(
        endpoints["mrAddDoc"],
        {
          ...docParams,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Doctor Added");
          navigate("/");
        } else {
          alert("Unexpected Error Occured");
        }
      })
      .catch((err) => alert("Unexpected Error Occured"))
      .finally(() => setIsSubmitting(false));
  }
  // Auth Start
  let navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const authStatus = isAuthenticated(); //Here Auth Status is JWT
    if (!authStatus) {
      navigate("/login");
    }
  }, []);
  //Auth End
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
        <h1 style={{color: "green", fontWeight: "600"}}>Crescendro</h1>
      </Container>
      <Container>
        <Formik
          validationSchema={schema}
          onSubmit={(e) => actualHandleSubmit(e, navigate)}
          initialValues={{
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            alternateContactNumber: "",
            emergencyContactNumber: "",
            address: "",
            district: "",
            pincode: "",
            doctorType: "",
            doctorRegistrationNumber: "",
            gender: GenderType.MALE,
            foodPreference: FoodPreference.NON_VEG,
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              style={{
                backgroundColor: "white",
                margin: "1px",
                padding: "5px",
                border: "1px solid #8c918c",
                borderRadius: "5px",
              }}
            >
              {/* Name */}
              <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationFormik01">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    style={{
                      borderColor: "#237547",
                      margin: "4px 1px 4px 1px",
                    }}
                    value={values.firstName}
                    onChange={handleChange}
                    isInvalid={!!errors.firstName}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="validationFormik02">
                  <Form.Control
                    type="text"
                    placeholder="Middle Name"
                    name="middleName"
                    style={{
                      borderColor: "#237547",
                      margin: "4px 1px 4px 1px",
                    }}
                    value={values.middleName}
                    onChange={handleChange}
                    isInvalid={!!errors.middleName}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.middleName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="validationFormik03">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    style={{
                      borderColor: "#237547",
                      margin: "6px 1px 1px 1px",
                    }}
                    value={values.lastName}
                    onChange={handleChange}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group as={Col} md="3" controlId="validationFormik04">
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    name="email"
                    style={{
                      borderColor: "#237547",
                      margin: "4px 1px 4px 1px",
                    }}
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Contact Number */}
                <Form.Group as={Col} md="3" controlId="validationFormik05">
                  <Form.Control
                    type="text"
                    placeholder="Contact Number"
                    name="contactNumber"
                    style={{
                      borderColor: "#237547",
                      margin: "4px 1px 4px 1px",
                    }}
                    value={values.contactNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.contactNumber}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.contactNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Alternate Contact Number */}
                <Form.Group as={Col} md="3" controlId="validationFormik06">
                  <Form.Control
                    type="text"
                    placeholder="Alternate Contact Number"
                    name="alternateContactNumber"
                    style={{
                      borderColor: "#237547",
                      margin: "4px 1px 4px 1px",
                    }}
                    value={values.alternateContactNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.alternateContactNumber}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.alternateContactNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Emergency Contact Number */}
                <Form.Group as={Col} md="3" controlId="validationFormik07">
                  <Form.Control
                    type="text"
                    placeholder="Emergency Contact Number"
                    name="emergencyContactNumber"
                    style={{
                      borderColor: "#237547",
                      margin: "4px 1px 4px 1px",
                    }}
                    value={values.emergencyContactNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.emergencyContactNumber}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.emergencyContactNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Address */}
                <Form.Group as={Col} md="3" controlId="validationFormik08">
                  <Form.Control
                    type="text"
                    placeholder="Residential Address"
                    name="address"
                    style={{
                      borderColor: "#237547",
                      margin: "4px 1px 4px 1px",
                    }}
                    value={values.address}
                    onChange={handleChange}
                    isInvalid={!!errors.address}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* District */}
                <Form.Group as={Col} md="3" controlId="validationFormik09">
                  <Form.Control
                    type="text"
                    placeholder="District"
                    name="district"
                    style={{
                      borderColor: "#237547",
                      margin: "4px 1px 4px 1px",
                    }}
                    value={values.district}
                    onChange={handleChange}
                    isInvalid={!!errors.district}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.district}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Pincode */}
                <Form.Group as={Col} md="3" controlId="validationFormik10">
                  <Form.Control
                    type="text"
                    placeholder="Pincode"
                    name="pincode"
                    style={{
                      borderColor: "#237547",
                      margin: "4px 1px 4px 1px",
                    }}
                    value={values.pincode}
                    onChange={handleChange}
                    isInvalid={!!errors.pincode}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.pincode}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Doctor Type */}
                <Form.Label>Doctor Type</Form.Label>
                <Form.Group className="mb-3">
                  <ButtonGroup>
                    <Form.Check
                      type="radio"
                      name="doctorType"
                      label={DoctorType.WBMC}
                      style={{
                        borderColor: "#237547",
                        margin: "4px 1px 4px 1px",
                      }}
                      value={DoctorType.WBMC}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      name="doctorType"
                      label={DoctorType.OTHERS}
                      style={{
                        borderColor: "#237547",
                        margin: "4px 1px 4px 1px",
                      }}
                      value={DoctorType.OTHERS}
                      onChange={handleChange}
                    />
                  </ButtonGroup>
                </Form.Group>

                {/* Registration Number */}
                <Form.Group as={Col} md="3" controlId="validationFormik10">
                  <Form.Control
                    type={
                      values.doctorType === DoctorType.WBMC ? "number" : "text"
                    }
                    placeholder="Registration Number"
                    name="doctorRegistrationNumber"
                    style={{
                      borderColor: "#237547",
                      margin: "4px 1px 4px 1px",
                    }}
                    value={values.doctorRegistrationNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.doctorRegistrationNumber}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.doctorRegistrationNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Gender */}
                <Form.Label>Gender</Form.Label>
                <Form.Group className="mb-3">
                  <ButtonGroup>
                    <Form.Check
                      type="radio"
                      name="gender"
                      label={GenderType.MALE}
                      style={{
                        borderColor: "#237547",
                        margin: "4px 1px 4px 1px",
                      }}
                      value={GenderType.MALE}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      name="gender"
                      label={GenderType.FEMALE}
                      style={{
                        borderColor: "#237547",
                        margin: "4px 1px 4px 1px",
                      }}
                      value={GenderType.FEMALE}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      name="gender"
                      label={GenderType.NON_BINARY}
                      style={{
                        borderColor: "#237547",
                        margin: "4px 1px 4px 1px",
                      }}
                      value={GenderType.NON_BINARY}
                      onChange={handleChange}
                    />
                  </ButtonGroup>
                </Form.Group>

                {/* Food Pref */}
                <Form.Label>Food Preference</Form.Label>
                <Form.Group className="mb-3">
                  <ButtonGroup>
                    <Form.Check
                      type="radio"
                      name="foodPreference"
                      label={FoodPreference.VEG}
                      style={{
                        borderColor: "#237547",
                        margin: "4px 1px 4px 1px",
                      }}
                      value={FoodPreference.VEG}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      name="foodPreference"
                      label={FoodPreference.NON_VEG}
                      style={{
                        borderColor: "#237547",
                        margin: "4px 1px 4px 1px",
                      }}
                      value={FoodPreference.NON_VEG}
                      onChange={handleChange}
                    />
                  </ButtonGroup>
                </Form.Group>
              </Row>
              <Button type="submit" disabled={isSubmitting}>
                Submit form
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}
