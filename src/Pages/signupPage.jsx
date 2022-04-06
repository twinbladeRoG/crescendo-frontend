import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Utils/Utils";
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import { GiStethoscope } from "react-icons/gi";
import { FcBusinessman } from "react-icons/fc";
import endpoints from "../Utils/endpoints";
import axios from "axios";
import { Formik, Field } from "formik";
import * as yup from "yup";

// ENUMS
const GenderType = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  NON_BINARY: "NON_BINARY",
};

const schema = yup.object({
  companyName: yup.string().required("Required"),
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Must be a valid email").required("Required"),
  contactNumber: yup
    .string()
    .required("Required")
    .matches(/^\d{10}$/, "Must be a valid 10 digit phone number"),
});

export default function SignupPage() {
  let navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function actualHandleSubmit(e) {
    setIsSubmitting(true);
    const signupParams = JSON.parse(JSON.stringify(e));
    signupParams["contactNumber"] = {
      countryCode: "+91",
      number: signupParams["contactNumber"],
    };
    // navigate("/");
    axios
      .post(
        endpoints["mrSignup"] +
          "?redirectTo=" +
          endpoints["redirectPath"],
        {
          ...signupParams,
        }
      )
      .then((res) => {
        alert("Please check your email for verification link.");
        navigate("/login");
      })
      .catch((err) => {
        alert("Unexpected Error Occured");
      })
      .finally(() => setIsSubmitting(false));
  }
  return (
    <>
      <h1 style={{ color: "green", fontWeight: "600" }}>Crescendo Signup</h1>
      <Container>
        <Formik
          validationSchema={schema}
          onSubmit={(e) => actualHandleSubmit(e)}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            gender: GenderType.MALE,
            companyName: "",
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
              {/* Company */}
              <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationFormik10">
                  <Form.Control
                    type="text"
                    placeholder="Company"
                    name="companyName"
                    style={{
                      borderColor: "#237547",
                      margin: "4px 1px 4px 1px",
                    }}
                    value={values.companyName}
                    onChange={handleChange}
                    isInvalid={!!errors.companyName}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.company}
                  </Form.Control.Feedback>
                </Form.Group>

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

                {/* Gender */}
                <Form.Label>Gender</Form.Label>
                <Form.Group className="mb-3">
                  <ButtonGroup>
                    <Form.Check
                      type="radio"
                      name="gender"
                      checked={GenderType.MALE === "MALE"}
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
