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
    useEffect(() => {
        var canvas = ref.current // use ref instead of document.getElementById as ref is considered a better react practice
        var heightRatio = 1.78; // height of img 3616 / width of img 2032
        canvas.height = 200 + canvas.width * heightRatio; // add 200: larger min canvas.width.
    }, []);


    /*************************** FORM ***************************/
    // const formInitialDetails = {
    //     fullName: '',
    //     email: '',
    //     message: ''
    // };

    const [fullName, setFullName] = useState("");
    // const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [fullNameError, setFullNameError] = useState();
    const [emailError, setEmailError] = useState(false);
    const [messageError, setMessageError] = useState();

    const [email, setEmail] = useState('');
    // const [error, setError] = useState(false);

    const onKeyDown = (e) => {
        if (e.code === 'Space') e.preventDefault()
    }

    const sanitizeEmail = (e) => {
        const email = e.target.value.trim();
        console.log(email);

        // a regex used to remove special chars (except for lower and upper case letters, numbers, and - @ .)
        const sanitizeEmailValue = email.replace(/[^-@.A-Za-z0-9]/g, '');

        setEmail(sanitizeEmailValue);

        // check if the original value differs from the sanitized value
        if (email !== sanitizeEmailValue) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const sanitizeFullName = (e) => {
        const fullName = e.target.value;
        console.log(fullName);

        // a regex used to remove special chars (except for lower and upper case letters, - . and whitespace (\s))
        const sanitizeFullNameValue = fullName.replace(/[^-.a-zA-Z\s]/g, '');

        setFullName(sanitizeFullNameValue);

        // check if the original value differs from the sanitized value
        if (fullName !== sanitizeFullNameValue) {
            setFullNameError(true);
        } else {
            setFullNameError(false);
        }
    };

    const sanitizeMessage = (e) => {
        const message = e.target.value;
        console.log(message);

        // a regex used to remove special chars (except for lower and upper case letters, numbers, - + & @ ? ! ' : / ( ) , . and whitespace (\s))
        const sanitizeMessageValue = message.replace(/[^-+&@?!':/(),.a-zA-Z0-9\s]/g, '');

        setMessage(sanitizeMessageValue);

        // check if the original value differs from the sanitized value
        if (message !== sanitizeMessageValue) {
            setMessageError(true);
        } else {
            setMessageError(false);
        }
    };

    // const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonTxt, setButtonTxt] = useState('Send');
    const [status, setStatus] = useState({});

    /* only updates the value user entered for its related category, leaving other form details untouched. */
    /* field names are the category, value is entered by users */
    // const onFormUpdate = (category, value) => {
    //     setFormDetails({
    //         ...formDetails,
    //         [category] : value,
    //     });
    // };

    /* async() as making request to API */
    const handleSubmit = async (e) => {
        e.preventDefault(); // do not want page reloaded when user submits the form
        setButtonTxt('Sending...');

        let response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            // body: JSON.stringify(formDetails)
        });

        let result = await response.json();

        setButtonTxt("Send");
        // setFormDetails(formDetails);

        if (result.code === 200) {
            setStatus({ success: true, message: "Message Sent Successfully." });
        } else {
            setStatus({ success: false, message: "Something Went Wrong, Please Try Again Later." });
        }

        // setFormDetails(formInitialDetails);
    }

    return (
        <section className="contact" id="connect">
            <Container>
                <div className="contact-container">
                    <Canvas id="responsive-canvas" ref={ref} camera={{ position: [0, 0, 5], fov: 40 }}>
                        <FadingImageDisplacement />
                    </Canvas>
                    <div className="contact-content">
                        <h2>Get In Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                {/* full name */}
                                <Col sm={12} className="px-1">
                                    <input
                                        required
                                        minLength={2}
                                        maxLength={128}
                                        type="text"
                                        placeholder="Full Name"
                                        value={fullName}
                                        onChange={sanitizeFullName}
                                    // value={formDetails.fullName} 
                                    // onChange={(e) => onFormUpdate("fullName", e.target.value)} 
                                    />
                                    {fullNameError && <span style={{ color: 'red' }}>Special characters are not allowed.</span>}
                                </Col>
                                {/* email */}
                                <Col sm={12} className="px-1">
                                    <input
                                        required
                                        type="email"
                                        maxLength={320}
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={sanitizeEmail}
                                    // value={formDetails.email}
                                    // onChange={(e) => onFormUpdate("email", e.target.value)}
                                    />
                                    {emailError && <span style={{ color: 'red' }}>Special characters are not allowed.</span>}
                                </Col>
                                {/* message */}
                                <Col sm={12} className="px-1">
                                    <textarea
                                        required
                                        minLength={5}
                                        maxLength={265}
                                        rows="6"
                                        placeholder="Message"
                                        value={message}
                                        onChange={sanitizeMessage}
                                    // value={formDetails.message}
                                    // onChange={(e) => onFormUpdate("message", e.target.value)} 
                                    />
                                    {messageError && <span style={{ color: 'red' }}>Special characters are not allowed.</span>}
                                </Col>
                                {/* submit button */}
                                <Col sm={12} className="px-1">
                                    <button type="submit"><span>{buttonTxt}</span>
                                    </button>
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