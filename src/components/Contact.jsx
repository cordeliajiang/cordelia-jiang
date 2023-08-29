import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap";
import './contact.css';
import './fadingimagedisplacement.css';
import contactImg from '../assets/img/contact-img.png';
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FadingImageDisplacement } from "./FadingImageDisplacement";

export const Contact = () => {
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    }
    
    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonTxt, setButtonTxt] = useState('Send');
    const [status, setStatus] = useState({});

    /* only updates the value user entered for its related category, leaving other form details untouched */
    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // do not want page reloaded when user submits the form
        setButtonTxt('Sending...');
        let response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json; charset=utf-8",
            },
            body: JSON.stringify(formDetails),
        });

        setButtonTxt("Send");
        let result = response.json();
        
        setFormDetails(formInitialDetails);
        if (result.code === 200){
            setStatus({ success: true, message: "Message Sent Successfully." });
        } else {
            setStatus({ success: false, message: "Something Went Wrong, Please Try Again Later." });
        }
    }

    return (
        <section className="contact" id="connect">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        {/* <img src={contactImg} alt="Contact Us"/> */}
                        <div style={{ width: "60vw", height: "150vh" }}>
                            <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
                                {/* <OrbitControls/> make image 3D, can scroll-in-out, and make rotate */}
                                <FadingImageDisplacement/>
                            </Canvas>
                        </div>
                    </Col>
                    <Col md={6} style={{ position: "relative" }}>
                        <h2>Get In Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className="px-1">
                                    <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                                </Col>
                                <Col sm={12} className="px-1">
                                    <input type="email" value={formDetails.email} placeholder="Email Adress" onChange={(e) => onFormUpdate('email', e.target.value)} />
                                </Col>
                                <Col sm={12} className="px-1">
                                    <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)} />
                                    <button type="submit"><span>{buttonTxt}</span></button>
                                </Col>
                                <Col>
                                {
                                    status.message &&
                                    <Col>
                                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                    </Col>
                                }
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}