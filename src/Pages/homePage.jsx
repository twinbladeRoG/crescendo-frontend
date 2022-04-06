import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Utils/Utils";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { MdOutlineMedicalServices } from "react-icons/md";
import { RiCustomerService2Line, RiLogoutBoxRLine } from "react-icons/ri";
import { GrOrganization } from "react-icons/gr";
import { AiOutlineMail, AiFillPhone } from "react-icons/ai";
import QRCode from "react-qr-code";


function getUserInfo(UserObj, type) {
  let userData = {};
  if (type === "DOCTOR") {
    const userName =
      UserObj.user.firstName +
      " " +
      UserObj.user.middleName +
      " " +
      UserObj.user.lastName;
    const email = UserObj.user.email;
    const doctorRegistrationNumber = UserObj.user.doctorRegistrationNumber;
    const doctorType = UserObj.user.doctorType;
    const contactNumber =
      UserObj.user.contactNumber.countryCode +
      " " +
      UserObj.user.contactNumber.number;
    userData = {
      type: "D",
      name: userName,
      email: email,
      doctorRegistrationNumber: doctorRegistrationNumber,
      doctorType: doctorType,
      contactNumber: contactNumber,
      companyName: doctorType,
    };
  } else {
    const userName = UserObj.user.firstName + " " + UserObj.user.lastName;
    const email = UserObj.user.email;
    const companyName = UserObj.user.companyName;
    const contactNumber =
      UserObj.user.contactNumber.countryCode +
      " " +
      UserObj.user.contactNumber.number;
    userData = {
      type: "M",
      name: userName,
      companyName: companyName,
      email: email,
      contactNumber: contactNumber,
    };
  }
  return userData;
}
export default function HomePage() {
  // Auth Checking start
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    companyName: "",
    email: "",
    contactNumber: "",
    userType: "",
  });
  useEffect(() => {
    const authStatus = isAuthenticated(true);
    if (authStatus) {
      console.log(authStatus);
      const userInfo = getUserInfo(authStatus, authStatus.user.type);
      setUserInfo(userInfo);
    } else {
      navigate("/login");
    }
  }, []);
  // Auth Checking end

  return (
    <>
      <Container>
        <RiLogoutBoxRLine
          className="float-end"
          size={30}
          color={"#4d120b"}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        />

        <h1>Home</h1>
        <Card
          style={{
            borderRadius: "5px",
            backgroundColor: "#4be640",
            margin: "20px 2px 20px 2px",
          }}
        >
          <Card.Body>
            <Card.Text>Welcome</Card.Text>
            <Card.Title as="h1">{userInfo.name}</Card.Title>
            <Card.Text style={{ margin: "2px" }}>
              <GrOrganization /> &nbsp;
              {userInfo.companyName}
            </Card.Text>
            <Card.Text style={{ margin: "2px" }}>
              <AiOutlineMail />
              &nbsp;
              {userInfo.email}
            </Card.Text>
            <Card.Text style={{ margin: "2px" }}>
              <AiFillPhone />
              &nbsp;
              {userInfo.contactNumber}
            </Card.Text>
          </Card.Body>
        </Card>
        {userInfo.type === "D" ? (
          /////  Doctor Screen ///////////
          <Card
            style={{
              borderRadius: "5px",
              border: "1px solid grey",
              margin: "20px 2px 20px 2px",
            }}
          >
            <Card.Body>
            <QRCode value={"CRSDO-" + userInfo.doctorRegistrationNumber} />
            <br/>
            <Card.Text as="strong">CRSDO-{userInfo.doctorRegistrationNumber}</Card.Text>
            </Card.Body>
          </Card>
        ) : (
          //////////////// MR SCREEN////////////////
          <>
            <Card
              style={{
                borderRadius: "5px",
                border: "1px solid grey",
                margin: "20px 2px 20px 2px",
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "green" }}>Add a doctor</Card.Title>
                <Row>
                  <Col className="col-md-4">
                    <MdOutlineMedicalServices size={70} />
                  </Col>
                  <Col className="col-md-8">
                    <Button variant="success" onClick={() => navigate("/add")}>
                      + Add Doctor
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card
              style={{
                borderRadius: "5px",
                border: "1px solid grey",
                margin: "20px 2px 20px 2px",
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "green" }}>
                  View Doctors You have OnBoarded
                </Card.Title>
                <Row>
                  <Col className="col-md-4">
                    <RiCustomerService2Line size={70} />
                  </Col>
                  <Col className="col-md-8">
                    <Button
                      variant="warning"
                      onClick={() => navigate("/mydocs")}
                    >
                      View Doctors
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </>
        )}
      </Container>
    </>
  );
}
