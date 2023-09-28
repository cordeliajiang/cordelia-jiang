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
    // original form details from user input, used to compare with sanitized form details for displaying error messages
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
            [e.target.name]: e.target.value
        })
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

    const [fullNameSpaceError, setFullNameSpaceError] = useState(false);
    const [messageSpaceNewLineError, setMessageSpaceNewLineError] = useState(false);

    const [invalidInputStatus, setInvalidInputStatus] = useState(false);
    const [invalidInputSpaceNewLineStatus, setInvalidInputSpaceNewLineStatus] = useState(false);

    const sanitizeFullName = (e) => {
        const sanitizedFullName = e.target.value;
        const fullNameRegex = /[^-.a-zA-Z\s]/g; // a regex used to remove special chars (except for lower and upper case letters, - . and whitespace (\s))
        const oneSpaceOnlyRegex = /  +/g;
        const sanitizedFullNameValue = sanitizedFullName.replace(fullNameRegex, '');
        const sanitizedFullNameValueLimitSpace = sanitizedFullNameValue.replace(oneSpaceOnlyRegex, " ");

        // value displayed on full name input field
        setSanitizedFullName(sanitizedFullNameValue);

        // form details display on email sent
        setFormDetails({
            ...formDetails,
            [e.target.name]: sanitizedFullNameValue
        })

        // display error message if the original input value differs from the sanitized value
        if (sanitizedFullName !== sanitizedFullNameValue) {
            setFullNameError(true);
            setInvalidInputStatus({ invalidFullName: true });
        } else {
            setFullNameError(false);
            setInvalidInputStatus({ invalidFullName: false });
        }

        // display error message if there are 2 or more consecutive spaces in sanitized full name
        if (sanitizedFullNameValue !== sanitizedFullNameValueLimitSpace) {
            setFullNameSpaceError(true);
            setInvalidInputSpaceNewLineStatus({ invalidFullNameSpace: true });
            setSanitizedFullName(sanitizedFullNameValueLimitSpace);
        } else {
            setFullNameSpaceError(false);
            setInvalidInputSpaceNewLineStatus({ invalidFullNameSpace: false });
        }
    };

    const sanitizeEmail = (e) => {
        const sanitizedEmail = e.target.value;
        const emailRegex = /[^-@.A-Za-z0-9]/g; // a regex used to remove special chars (except for lower and upper case letters, numbers, and - @ .)
        const oneSpaceOnlyRegex = /\s\s+/g;
        const sanitizedEmailValue = sanitizedEmail.replace(emailRegex, '').replace(oneSpaceOnlyRegex, " "); 

        // value displayed on email input field
        setSanitizedEmail(sanitizedEmailValue);

        // form details display on email sent
        setFormDetails({
            ...formDetails,
            [e.target.name]: sanitizedEmailValue
        })

        // display error message if the original value differs from the sanitized value
        if (sanitizedEmail !== sanitizedEmailValue) {
            setEmailError(true);
            setInvalidInputStatus({ invalidEmail: true });
        } else {
            setEmailError(false);
            setInvalidInputStatus({ invalidEmail: false });
        }
    };

    const sanitizeMessage = (e) => {
        const sanitizedMessage = e.target.value;
        const messageRegex = /[^-@?!':/,.a-zA-Z0-9\s]/g; // a regex used to remove special chars (except for lower and upper case letters, numbers, - @ ? ! ' : / , . and whitespace (\s))
        const twoSpaceNewLineOnlyRegex = /\s{4,}/g;
        const sanitizedMessageValue = sanitizedMessage.replace(messageRegex, '')
        const sanitizedMessageValueLimitSpaceNewLine = sanitizedMessageValue.replace(twoSpaceNewLineOnlyRegex, ' '); 

        // value displayed on email input field
        setSanitizedMessage(sanitizedMessageValue);

        // form details display on email sent
        setFormDetails({
            ...formDetails,
            [e.target.name]: sanitizedMessageValue
        })

        // display error message if the original value differs from the sanitized value
        if (sanitizedMessage !== sanitizedMessageValue) {
            setMessageError(true);
            setInvalidInputStatus({ invalidMessage: true });
        } else {
            setMessageError(false);
            setInvalidInputStatus({ invalidMessage: false });
        }

        // display error message if there are more than 3 consecutive spaces or more than 3 consecutive new lines (enter/return key)
        if (sanitizedMessageValue !== sanitizedMessageValueLimitSpaceNewLine) {
            setMessageSpaceNewLineError(true);
            setInvalidInputSpaceNewLineStatus({ invalidMessageSpaceNewLine: true });
            setSanitizedMessage(sanitizedMessageValueLimitSpaceNewLine);
        } else {
            setMessageSpaceNewLineError(false);
            setInvalidInputSpaceNewLineStatus({ invalidMessageSpaceNewLine: false });
        }
    };


    const { register, handleSubmit, formState: { errors } } = useForm();


    /* async() as making request to API */
    const submitHandler = async (e) => {
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

        if (result.code === 200) {
            setStatus({ success: true, message: "Message Sent Successfully." });

            // clear sanitized form inputs and related error messages
            setSanitizedFullName("");
            setSanitizedEmail("");
            setSanitizedMessage("")
            setFullNameError(false);
            setEmailError(false);
            setMessageError(false);
            setFullNameSpaceError(false);
            setMessageSpaceNewLineError(false);
            setInvalidInputStatus(false);
            setInvalidInputSpaceNewLineStatus(false);
        } else {
            setStatus({ success: false, message: "Something Went Wrong, Please Try Again Later." });
        }

        return false; // do not want page reloaded when user submits the form
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
                                        className= {`${invalidInputStatus.invalidFullName === true ? "invalidInput" : ""} ${invalidInputSpaceNewLineStatus.invalidFullNameSpace === true ? "invalidInput" : ""}`}
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
                                    {errors.sanitizedFullName && <p className="danger">{errors.sanitizedFullName?.message}</p>} {/* check message only when fullName exists */}
                                    {fullNameError && <p className="danger">Full name cannot contain any of the following: 0 1 2 3 4 5 6 7 8 9 ` = &#91; &#93; \ ; ' , / ~ ! @ # $ % ^ & * &#40; &#41; _ + &#123; &#125; | : " &lt; &gt; ?</p>}
                                    {fullNameSpaceError && <p className="danger">Full name cannot contain 2 or more consecutive spaces.</p>}
                                </Col>
                                {/* email */}
                                <Col sm={12} className="px-1">
                                    <input
                                        className={invalidInputStatus.invalidEmail === true ? "invalidInput" : ""}
                                        name="sanitizedEmail"
                                        {...register("sanitizedEmail", {
                                            required: "Email address is required.",
                                            maxLength: {
                                                value: 254,
                                                message: 'Email address cannot exceed 254 characters.',
                                            },
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Please enter your email address in format e.g. yourname@domain.com"
                                            },
                                        })}
                                        placeholder="Email Address"
                                        value={sanitizedEmail}
                                        onChange={(e) => {
                                            onFormUpdate(e);
                                            sanitizeEmail(e);
                                        }}
                                    />
                                    {errors.sanitizedEmail && <p className="danger">{errors.sanitizedEmail?.message}</p>}
                                    {emailError && <p className="danger">Email cannot contain any of the following: ` = &#91; &#93; \ ; ' , / ~ ! # $ % ^ & * &#40; &#41; _ + &#123; &#125; | : " &lt; &gt; ?</p>}
                                </Col>
                                {/* message */}
                                <Col sm={12} className="px-1">
                                    <textarea
                                        className={`${invalidInputStatus.invalidMessage === true ? "invalidInput" : "validInput"} ${invalidInputSpaceNewLineStatus.invalidMessageSpaceNewLine === true ? "invalidInput" : "validInput" }`}
                                        rows="6"
                                        name="sanitizedMessage"
                                        {...register("sanitizedMessage", {
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
                                        onChange={(e) => {
                                            onFormUpdate(e);
                                            sanitizeMessage(e);
                                        }}
                                    />
                                    {/* HTML ESCAPE CHARACTER CODES:
                                        &#40; is ( , &#41; is )
                                    */}
                                    {errors.sanitizedMessage && <p className="danger">{errors.sanitizedMessage?.message}</p>}
                                    {messageError && <p className="danger">Message cannot contain any of the following: ` = &#91; &#93; \ ; ' , / ~ ! # $ % ^ & * &#40; &#41; _ + &#123; &#125; | : " &lt; &gt; ?</p>}
                                    {messageSpaceNewLineError && <p className="danger">Message cannot contain more than 3 consecutive spaces or more than 3 consecutive new lines &#40; enter / return key &#41;.</p>}
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