import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Utils/Utils";
import { Card, Container, Button } from "react-bootstrap";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { AiOutlineMail, AiFillHome } from "react-icons/ai";
import { BiRegistered } from "react-icons/bi";
import endpoints from "../Utils/endpoints";
import axios from "axios";

export default function AllDocPage() {
  // Auth Checking start
  let navigate = useNavigate();
  const [allDocs, setAllDocs] = useState([]);
  useEffect(() => {
    const authStatus = isAuthenticated(); // Here authStatus is JWT on Success
    if (authStatus) {
      axios
        .get(endpoints["mrFetchDocs"], {
          headers: { Authorization: `Bearer ${authStatus}` },
        })
        .then((res) => {
          setAllDocs(res.data.data.doctors);
        })
        .catch((error) => alert("Unexpected Error Occured!"));
    } else {
      navigate("/login");
    }
  }, []);
  // Auth Checking end

  return (
    <>
      <Container>
        <AiFillHome
          className="float-end"
          size={30}
          color={"green"}
          onClick={() => navigate("/")}
        />
         <h1 style={{color: "green", fontWeight: "600"}}>Crescendro</h1>
        <h1>Onboarded Doctors</h1>
        {allDocs.map((doc, idx) => {
          return (
            <Card
              style={{
                borderRadius: "7px",
                margin: "20px 2px 20px 2px",
                border: "1px solid #8c918c",
              }}
              key={idx}
            >
              <Card.Body>
                <Card.Title
                  style={{
                    fontWeight: "bolder",
                    fontSize: "22px",
                    color: "#106908",
                  }}
                >
                  {doc.firstName + " " + doc.middleName + " " + doc.lastName}
                </Card.Title>
                <Card.Text>
                  <BiRegistered color="#1a5e15" />
                  &nbsp; {doc.doctorRegistrationNumber}
                </Card.Text>
                <Card.Text>
                  <BsFillTelephoneOutboundFill color="#1a5e15" />
                  &nbsp;{" "}
                  {doc.contactNumber.countryCode +
                    " " +
                    doc.contactNumber.number}
                </Card.Text>
                <Card.Text>
                  <AiOutlineMail color="#1a5e15" />
                  &nbsp; {doc.email}
                </Card.Text>
              </Card.Body>
              <Button
                onClick={() => {
                  localStorage.setItem("ZDSMYDOC", JSON.stringify(doc));
                  navigate("/edit");
                }}
              >
                Edit
              </Button>
            </Card>
          );
        })}
      </Container>
    </>
  );
}
