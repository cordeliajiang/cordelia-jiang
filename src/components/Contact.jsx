import { useEffect, useRef, useState } from "react"
import { Container, Row, Col } from "react-bootstrap";
import './contact.css';
import { Canvas } from "@react-three/fiber";
import { FadingImageDisplacement } from "./FadingImageDisplacement";

export const Contact = () => {
    const ref = useRef(null); // use useRef to access the DOM
    
    // useEffect is used as it runs as soon as the DOM has rendered / reloads.
    // without using useEffect, canvas.height and canvas.width will return null, as they are evaluated before DOM is rendered/loaded.
    // canvas is a DOM element, DOM elements cannot be accessed untill DOM is loaded.
    useEffect (() => {
        var canvas = ref.current // use ref instead of document.getElementById as ref is considered a better react practice
        var heightRatio = 1.78; // height of img 3616 / width of img 2032
        canvas.height = 200 + canvas.width * heightRatio; // add 200: larger min canvas.width.
    }, []);

    /*************************** FORM ***************************/
    const formInitialDetails = {
        fullName: '',
        email: '',
        message: ''
    };

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonTxt, setButtonTxt] = useState('Send');
    const [status, setStatus] = useState({});

    /* only updates the value user entered for its related category, leaving other form details untouched. */
    /* field names are the category, value is entered by users */
    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category] : value,
        });
    };

    /* async() as making request to API */
    const handleSubmit = async (e) => {
        e.preventDefault(); // do not want page reloaded when user submits the form
        setButtonTxt('Sending...');
        let response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formDetails)
        });

        let result = await response.json();

        setButtonTxt("Send");
        setFormDetails(formDetails);

        if (result.code === 200) {
            setStatus({ success: true, message: "Message Sent Successfully." });
        } else {
            setStatus({ success: false, message: "Something Went Wrong, Please Try Again Later." });
        }
    }

    return (
        <section className="contact" id="connect">
            <Container>
                <div className="contact-container">
                    <Canvas id="responsive-canvas" ref={ref} camera={{ position: [0, 0, 5], fov: 40 }}>
                        <FadingImageDisplacement/>
                    </Canvas>
                    <div className="contact-content">
                        <h2>Get In Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                {/* full name */}
                                <Col sm={12} className="px-1">
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="Full Name" 
                                        value={formDetails.fullName} 
                                        onChange={(e) => onFormUpdate("fullName", e.target.value)} 
                                    />
                                </Col>
                                {/* email */}
                                <Col sm={12} className="px-1">
                                    <input 
                                        required
                                        type="email" 
                                        placeholder="Email Address" 
                                        value={formDetails.email}
                                        onChange={(e) => onFormUpdate("email", e.target.value)} 
                                    />
                                </Col>
                                {/* message */}
                                <Col sm={12} className="px-1">
                                    <textarea 
                                        required
                                        rows="6" 
                                        placeholder="Message" 
                                        value={formDetails.message}
                                        onChange={(e) => onFormUpdate("message", e.target.value)} 
                                    />
                                </Col>
                                {/* submit button */}
                                <Col sm={12} className="px-1">
                                    <button type="submit"><span>{buttonTxt}</span></button>
                                    {status.message && (
                                        <div className="row">
                                            <p className={status.success === false ? "danger" : "success"}>
                                                {status.message}
                                            </p>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    )
}