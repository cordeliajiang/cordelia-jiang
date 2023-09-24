import { useEffect, useRef, useState } from "react"
import { Container, Row, Col } from "react-bootstrap";
import './contact.css';
import { Canvas } from "@react-three/fiber";
import { FadingImageDisplacement } from "./FadingImageDisplacement";
import { useForm } from "react-hook-form";

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
    const [formDetails, setFormDetails] = useState({ 
        fullName: '', 
        email: '', 
        message: '' 
    }); 

    /* only updates the value user entered for its related category, leaving other form details untouched. */
    /* e.target.name are the category, e.target.value is entered by users */
    const onFormUpdate = (e) => {
        setFormDetails({
            ...formDetails, 
            [e.target.name]: e.target.value})
    }

    const [buttonTxt, setButtonTxt] = useState('Send');
    const [status, setStatus] = useState({});


    /*************************** INPUT SANITIZATION ***************************/
    const [sanitizedFullName, setSanitizedFullName] = useState('');
    const [sanitizedEmail, setSanitizedEmail] = useState('');
    const [sanitizedMessage, setSanitizedMessage] = useState('');

    const [fullNameError, setFullNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const sanitizeFullName = (e) => {
        const sanitizedFullName = e.target.value;
        const sanitizedFullNameValue = sanitizedFullName.replace(/[^-.a-zA-Z\s]/g, ''); // a regex used to remove special chars (except for lower and upper case letters, - . and whitespace (\s))

        // value displayed on full name input field
        setSanitizedFullName(sanitizedFullNameValue);

        // form details display on email
        setFormDetails({
            ...formDetails, 
            [e.target.name]: sanitizedFullNameValue
        })

        // check if the original value differs from the sanitized value
        if (sanitizedFullName !== sanitizedFullNameValue) {
            setFullNameError(true);
        } else {
            setFullNameError(false);
        }
    };

    const sanitizeEmail = (e) => {
        const sanitizedEmail = e.target.value;
        const sanitizedEmailValue = sanitizedEmail.replace(/[^-@.A-Za-z0-9]/g, ''); // a regex used to remove special chars (except for lower and upper case letters, numbers, and - @ .)

        // value displayed on email input field
        setSanitizedEmail(sanitizedEmailValue);

        // form details display on email
        setFormDetails({
            ...formDetails, 
            [e.target.name]: sanitizedEmailValue
        })

        // check if the original value differs from the sanitized value
        if (sanitizedEmail !== sanitizedEmailValue) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const sanitizeMessage = (e) => {
        const sanitizedMessage = e.target.value;
        const sanitizedMessageValue = sanitizedMessage.replace(/[^-@?!':/,.a-zA-Z0-9\s]/g, ''); // a regex used to remove special chars (except for lower and upper case letters, numbers, - @ ? ! ' : / , . and whitespace (\s))
        
        // value displayed on email input field
        setSanitizedMessage(sanitizedMessageValue);

        // form details display on email
        setFormDetails({
            ...formDetails, 
            [e.target.name]: sanitizedMessageValue
        })

        // check if the original value differs from the sanitized value
        if (sanitizedMessage !== sanitizedMessageValue) {
            setMessageError(true);
        } else {
            setMessageError(false);
        }
    };


    const { register, handleSubmit, formState: { errors } } = useForm();

    /* async() as making request to API */
    const submitHandler = async (e) => {
        // e.preventDefault(); // do not want page reloaded when user submits the form
        setButtonTxt('Sending...');

        let response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formDetails)
        });

        setButtonTxt("Send");
        let result = await response.json();
        setFormDetails(formDetails);

        if (result.code === 200) {
            setStatus({ success: true, message: "Message Sent Successfully." });
        } else {
            setStatus({ success: false, message: "Something Went Wrong, Please Try Again Later." });
        }
    
        return false;
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
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <Row>
                                {/* full name */}
                                <Col sm={12} className="px-1">
                                    <input
                                        type="text"
                                        name="sanitizedFullName"
                                        placeholder="Full Name"
                                        {...register("sanitizedFullName", {
                                            required: "Full name is required.",
                                            minLength: {
                                                value: 4,
                                                message: 'Full name needs 4 or more characters.',
                                            },
                                            maxLength: {
                                                value: 128,
                                                message: 'Full name cannot exceed 128 characters.',
                                            }
                                        })
                                        }
                                        // value={fullName}
                                        // onChange={sanitizeFullName}
                                        value={sanitizedFullName}
                                        onChange={(e) => {
                                            onFormUpdate(e);
                                            sanitizeFullName(e);
                                        }}
                                    />
                                    {/* HTML ESCAPE CHARACTER CODES: 
                                        &#91; is [ , &#93; is ]
                                        &#40; is ( , &#41; is )
                                        &#123; is { , &#125; is }
                                        &lt; is < , &gt; is > 
                                    */}
                                    {/* Full name cannot contain any of the following: 0-9 ` = &#91; &#93; \ ; ' , / ~ ! @ # $ % ^ & * &#40; &#41; _ + &#123; &#125; | : " &lt; &gt; ? */}
                                    {fullNameError && <span style={{ color: 'red' }}>Full name cannot contain any of the following: 0-9 ` = &#91; &#93; \ ; ' , / ~ ! @ # $ % ^ & * &#40; &#41; _ + &#123; &#125; | : " &lt; &gt; ?</span>}
                                    {errors.sanitizedFullName && <span style={{ color: 'red' }}>{errors.fullName?.message}</span>} {/* check message only when fullName exists */}
                                </Col>
                                {/* email */}
                                <Col sm={12} className="px-1">
                                    <input
                                        // type="email"
                                        name="email"
                                        {...register("email", {
                                            required: "Email address is required.",
                                            maxLength: {
                                                value: 320,
                                                message: 'Email address cannot exceed 320 characters.',
                                            },
                                            pattern: {
                                                // value: ".+@.+\..+[A-Za-z]+$",
                                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Please enter your email address in format e.g. yourname@domain.com"
                                            },
                                        })}
                                        placeholder="Email Address"
                                        // value={email}
                                        // onChange={sanitizeEmail}

                                        value={sanitizedEmail}
                                        onChange={(e) => {
                                            onFormUpdate(e);
                                            sanitizeEmail(e);
                                        }}
                                    />
                                    {/* Email cannot contain any of the following: ` = &#91; &#93; \ ; ' , / ~ ! # $ % ^ & * &#40; &#41; _ + &#123; &#125; | : " &lt; &gt; ? */}
                                    {emailError && <span style={{ color: 'red' }}>Email cannot contain any of the following: ` = &#91; &#93; \ ; ' , / ~ ! # $ % ^ & * &#40; &#41; _ + &#123; &#125; | : " &lt; &gt; ?</span>}
                                    {errors.email && <span style={{ color: 'red' }}>{errors.email?.message}</span>}
                                </Col>
                                {/* message */}
                                <Col sm={12} className="px-1">
                                    <textarea
                                        rows="6"
                                        name="message"
                                        {...register("message", {
                                            required: "Message is required.",
                                            minLength: {
                                                value: 5,
                                                message: 'Message needs 5 or more characters.',
                                            },
                                            maxLength: {
                                                value: 250,
                                                message: 'Message cannot exceed 250 characters.',
                                            }
                                        })
                                        }
                                        placeholder="Message"
                                        value={sanitizedMessage}
                                        // onChange={sanitizeMessage}

                                        // value={formDetails.message}
                                        // onChange={(e) => onFormUpdate("message", e.target.value)}
                                        onChange={(e) => {
                                            onFormUpdate(e);
                                            sanitizeMessage(e);
                                        }}
                                    />
                                    {/* Message cannot contain any of the following: ` = &#91; &#93; \ ; ~ # $ % ^ & * &#40; &#41; _ + &#123; &#125; | " &lt; &gt; */}
                                    {messageError && <span style={{ color: 'red' }}>Message cannot contain any of the following: ` = &#91; &#93; \ ; ' , / ~ ! # $ % ^ & * &#40; &#41; _ + &#123; &#125; | : " &lt; &gt; ?</span>}
                                    {errors.message && <span style={{ color: 'red' }}>{errors.message?.message}</span>}
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