import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAuthenticated } from "../Utils/Utils";
import { Form, Button, Container, Card } from "react-bootstrap";
import validate from "validator";
import endpoints from "../Utils/endpoints";
import axios from "axios";

function passCheck(passw, passwConfirm) {
  const isPasswordStrong = validate.isStrongPassword(passw, {
    minLength: 8,
    minLowercase: 2,
    minUppercase: 2,
    minNumbers: 2,
    minSymbols: 2,
    returnScore: false,
    pointsPerUnique: 10,
    pointsPerRepeat: 0.5,
    pointsForContainingUpper: 10,
    pointsForContainingLower: 10,
    pointsForContainingNumber: 10,
    pointsForContainingSymbol: 10,
  });
  if (isPasswordStrong) {
    if (passw !== passwConfirm) {
      alert("Both passwords not Matching");
      return false;
    }
  } else {
    alert("password Not Strong Enough!");
    return false;
  }
  return true;
}
export default function SetPasswordPage() {
  function handleLogin() {
    const passGood = passCheck(passw, passwConfirm);
    const JWT = localStorage.getItem("ZDSJWT");

    const url = endpoints.mrSetPass;
    if (!passGood) {
      return false;
    }
    axios
      .post(
        url,
        { password: passw },
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      )
      .then((res) => {
        alert(
          "password change successfull. Please Login with your credentials."
        );
        navigate('/login');
      })
      .catch((err) => {
        alert("Unexpected Error Occured!");
      });
  }
  // Auth Checking start
  let navigate = useNavigate();
  useEffect(() => {
    const URItoken = window.location.href.split("emailVerificationHash=")[1];
    const getTokenURL = endpoints.mrGetAuth + URItoken;
    axios
      .get(getTokenURL)
      .then((res) => localStorage.setItem("ZDSJWT", res.data.data.token))
      .catch((err) => alert("Unexpected Error Occured!"));
  }, []);
  // Auth Checking end
  const [passwConfirm, setPasswConfirm] = useState("");
  const [passw, setPassw] = useState("");
  return (
    <>
      <Container>
      <h1 style={{color: "green", fontWeight: "600"}}>Crescendo</h1>
      </Container>

      <Container style={{ marginTop: "5%" }}>
        <Form>
          <Form.Text className="text-muted">Set Your Password</Form.Text>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              style={{ borderColor: "#237547" }}
              value={passw}
              onChange={(e) => setPassw(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword1">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              style={{ borderColor: "#237547" }}
              value={passwConfirm}
              onChange={(e) => setPasswConfirm(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="success"
            style={{ width: "100%" }}
            onClick={() => handleLogin()}
          >
            Submit
          </Button>
          <Form.Text className="text-muted">
            Password must contain two UPPERCASE, two LOWERCASE, two SPECIAL
            CHARACTER and two NUMBER each. Also password length must be more
            than 8 character.
          </Form.Text>
        </Form>
      </Container>
    </>
  );
}
