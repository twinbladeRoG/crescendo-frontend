import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAuthenticated } from "../Utils/Utils";
import { Form, Button, Container, Card } from "react-bootstrap";
import { GiStethoscope } from "react-icons/gi";
import { FcBusinessman } from "react-icons/fc";
import endpoints from "../Utils/endpoints";
import axios from "axios";

function handleLogin(email, passw, isDoctor, navigate) {
  const url = isDoctor ? endpoints["docLogin"] : endpoints["mrLogin"];
  axios
    .post(url, { email: email, password: passw })
    .then((res) => {
      localStorage.setItem("ZDSCRSCREDS", JSON.stringify(res.data));
      const authStatus = isAuthenticated();
      if (authStatus) {
        navigate("/");
      }
    })
    .catch((err) => {
      alert("Username / Password not valid!");
    });
}

export default function LoginPage() {
  // Auth Checking start
  let navigate = useNavigate();
  useEffect(() => {
    const authStatus = isAuthenticated();
    if (!authStatus) {
      navigate("/login");
    }
    // If authenticated go login -> Home
    else {
      navigate("/");
    }
  }, []);
  // Auth Checking end
  const [loginAsDoc, setloginAsDoc] = useState(false);
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");

  return (
    <>
      <Container>
      <h1 style={{color: "green", fontWeight: "600"}}>Crescendro</h1>
        <Card>
          <Card.Body style={{ backgroundColor: "#4be640" }}>
            <Card.Text>Login as</Card.Text>
            <Form.Check
              checked={loginAsDoc}
              onChange={() => {
                setloginAsDoc(!loginAsDoc);
              }}
              type="switch"
              id="custom-switch"
            />
            <Card.Title as="h2">
              {loginAsDoc ? "Doctor" : "Medical Representative"}
            </Card.Title>
            {loginAsDoc ? (
              <GiStethoscope size="100" color="#54534f" />
            ) : (
              <FcBusinessman size="100" />
            )}
          </Card.Body>
        </Card>
      </Container>

      <Container style={{ marginTop: "5%" }}>
        <Form>
          <Form.Text className="text-muted">
            Enter your email and password to login to your account.
          </Form.Text>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              style={{ borderColor: "#237547" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              style={{ borderColor: "#237547" }}
              value={passw}
              onChange={(e) => setPassw(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="success"
            style={{ width: "100%" }}
            onClick={() => handleLogin(email, passw, loginAsDoc, navigate)}
          >
            Submit
          </Button>
        </Form>
        
        {loginAsDoc ? (
          ""
        ) : (
          <p style={{ marginTop: "20px" }}>
            Not Registered?
            <Link to="/signup">Signup Here</Link>
          </p>
        )}
      </Container>
    </>
  );
}
