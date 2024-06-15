import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './contact.css';
import { Canvas } from "@react-three/fiber";
import { FadingImageDisplacement } from "./FadingImageDisplacement";
import { useForm } from "react-hook-form";
import { BiSolidErrorCircle } from 'react-icons/bi';
import useAutoHeight from './useAutoHeight';

const Contact = () => {
    const { heightState, contentRef, containerRef } = useAutoHeight();
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        canvas.height = 200 + canvas.width * 1.78;
    }, []);

    const [formDetails, setFormDetails] = useState({ fullName: '', email: '', message: '' });
    const [buttonTxt, setButtonTxt] = useState('Send');
    const [status, setStatus] = useState({});
    const [inputErrors, setInputErrors] = useState({ fullName: '', email: '', message: '' });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    // const sanitizeInput = (value, regex, errorMessage, spaceRegex, spaceErrorMessage, firstCharErrorMessage) => {
    //     const containsSpecialCharacters = regex.test(value);
    //     const containsConsecutiveSpaces = spaceRegex.test(value);
    //     const startsWithSpace = value.startsWith(' ');

    //     let sanitizedValue = value.replace(regex, '').replace(spaceRegex, ' ');

    //     let error = '';
    //     if (containsSpecialCharacters) {
    //         error = errorMessage;
    //     } else if (containsConsecutiveSpaces) {
    //         error = spaceErrorMessage;
    //     } else if (startsWithSpace) {
    //         error = firstCharErrorMessage;
    //     }

    //     return { sanitizedValue: sanitizedValue.trimStart(), error };
    // };

    // const handleSanitization = (e, regex, errorMessage, spaceRegex, spaceErrorMessage, firstCharErrorMessage) => {
    //     const { name, value } = e.target;
    //     const { sanitizedValue, error } = sanitizeInput(value, regex, errorMessage, spaceRegex, spaceErrorMessage, firstCharErrorMessage);

    //     setInputErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    //     setFormDetails((prevDetails) => ({ ...prevDetails, [name]: sanitizedValue }));
    //     setValue(name, sanitizedValue, { shouldValidate: true });
    // };

    // const handleEmailChange = (e) => {
    //     const { value, selectionStart } = e.target;
    //     const sanitizedValue = value.replace(/[^-@.a-zA-Z0-9]/g, '');
    //     const cursorPosition = selectionStart - (value.slice(0, selectionStart).match(/[^-@.a-zA-Z0-9]/g) || []).length;

    //     setFormDetails((prevDetails) => ({ ...prevDetails, email: sanitizedValue }));
    //     setValue('email', sanitizedValue, { shouldValidate: true });

    //     // Manually update the input value and restore the cursor position
    //     e.target.value = sanitizedValue;
    //     e.target.setSelectionRange(cursorPosition, cursorPosition);

    //     // Set error if special characters are present
    //     const error = value !== sanitizedValue ? 'Email cannot contain special characters.' : '';
    //     setInputErrors((prevErrors) => ({ ...prevErrors, email: error }));
    // };


    // const sanitizeInput = (value, regex, errorMessage, spaceRegex, spaceErrorMessage, firstCharErrorMessage) => {
    //     let error = '';

    //     if (regex.test(value)) {
    //         error = errorMessage;
    //     } else if (spaceRegex.test(value)) {
    //         error = spaceErrorMessage;
    //     } else if (value.startsWith(' ')) {
    //         error = firstCharErrorMessage;
    //     }

    //     const sanitizedValue = value.replace(regex, '').replace(spaceRegex, ' ').trimStart();
    //     return { sanitizedValue, error };
    // };

    // const handleSanitization = (e, regex, errorMessage, spaceRegex, spaceErrorMessage, firstCharErrorMessage) => {
    //     const { name, value } = e.target;
    //     const { sanitizedValue, error } = sanitizeInput(value, regex, errorMessage, spaceRegex, spaceErrorMessage, firstCharErrorMessage);

    //     setInputErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    //     setFormDetails((prevDetails) => ({ ...prevDetails, [name]: sanitizedValue }));
    //     setValue(name, sanitizedValue, { shouldValidate: true });
    // };

    // const handleEmailChange = (e) => {
    //     const { value, selectionStart } = e.target;
    //     const regex = /[^-@.\sa-zA-Z0-9]/g;
    //     const spaceRegex = /\s{2,}/g;

    //     const { sanitizedValue, error } = sanitizeInput(
    //         value,
    //         regex,
    //         'Email cannot contain special characters.',
    //         spaceRegex,
    //         'Email cannot contain consecutive spaces.',
    //         'Email cannot start with a space.'
    //     );

    //     const cursorPosition = selectionStart - (value.slice(0, selectionStart).match(regex) || []).length;

    //     setFormDetails((prevDetails) => ({ ...prevDetails, email: sanitizedValue }));
    //     setInputErrors((prevErrors) => ({ ...prevErrors, email: error }));
    //     setValue('email', sanitizedValue, { shouldValidate: true });

    //     // Manually update the input value and restore the cursor position
    //     e.target.value = sanitizedValue;
    //     e.target.setSelectionRange(cursorPosition, cursorPosition);
    // };


    const sanitizeInput = (value, regex, errorMessage, spaceRegex, spaceErrorMessage, firstCharErrorMessage) => {
        let error = '';

        if (regex.test(value)) {
            error = errorMessage;
        } else if (spaceRegex.test(value)) {
            error = spaceErrorMessage;
        } else if (value.startsWith(' ')) {
            error = firstCharErrorMessage;
        }

        const sanitizedValue = value.replace(regex, '').replace(spaceRegex, ' ').trimStart();
        return { sanitizedValue, error };
    };

    const handleSanitization = (e, regex, errorMessage, spaceRegex, spaceErrorMessage, firstCharErrorMessage) => {
        const { name, value } = e.target;
        const { sanitizedValue, error } = sanitizeInput(value, regex, errorMessage, spaceRegex, spaceErrorMessage, firstCharErrorMessage);

        setInputErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        setFormDetails((prevDetails) => ({ ...prevDetails, [name]: sanitizedValue }));
        setValue(name, sanitizedValue, { shouldValidate: true });
    };

    const handleEmailChange = (e) => {
        const { value, selectionStart } = e.target;
        const regex = /[^-@.\sa-zA-Z0-9]/g;
    const handleNameChange = (e) => {
        const { name, value } = e.target;
        const specialCharRegex = /[^-. \sa-zA-Z\s]/g;
        const consecutiveSpaceRegex = / {2,}/g;
        const consecutiveAdjacentHyphenPeriodRegex = /[-.]{2,}/g; // No hyphen and no period can sit adjacent to each other
    
        const specialCharErrorMessage = 'Full Name cannot contain special characters except for hyphens (-) and periods (.).';
        const consecutiveSpaceErrorMessage = 'Full Name cannot contain consecutive spaces.';
        const consecutiveAdjacentHyphenPeriodRegexErrorMessage = 'Full Name cannot contain consecutive or adjacent hyphens (-) or periods (.).';
        const firstCharSpaceErrorMessage = 'Full Name cannot start with a space.';
    
        let sanitizedValue = value;
        let error = '';
    
        // Check for special characters
        if (specialCharRegex.test(value)) {
            error = specialCharErrorMessage;
            sanitizedValue = sanitizedValue.replace(specialCharRegex, '');
        }
    
        // Replace consecutive space with a single space
        if (consecutiveSpaceRegex.test(sanitizedValue)) {
            sanitizedValue = sanitizedValue.replace(consecutiveSpaceRegex, ' ');
            error = consecutiveSpaceErrorMessage;
        }
    
        // Replace consecutive hyphens or periods with a single instance
        if (consecutiveAdjacentHyphenPeriodRegex.test(sanitizedValue)) {
            sanitizedValue = sanitizedValue.replace(consecutiveAdjacentHyphenPeriodRegex, match => match[0]);
            error = consecutiveAdjacentHyphenPeriodRegexErrorMessage;
        }
    
        // Check if the first character is a space
        if (sanitizedValue.startsWith(' ')) {
            sanitizedValue = sanitizedValue.trimStart();
            error = firstCharSpaceErrorMessage;
        }
    
        // Set errors and form details
        setInputErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        setFormDetails((prevDetails) => ({ ...prevDetails, [name]: sanitizedValue }));
        setValue(name, sanitizedValue, { shouldValidate: true });
    };    
    const handleMessageChange = (e) => {
        const { name, value } = e.target;
        const specialCharRegex = /[`[\]\\/;~^_{}|<>]/g;
        const consecutiveSpaceRegex = / {2,}/g;
        const consecutiveNewLineRegex = /\n{3,}/g;
        const consecutiveSpecialCharRegex = /([-]{2,})|([.]{2,})/g;
    
        const errorMessage = 'Message cannot contain the following special characters: ` [ ] \\ ; ~ ^ _ { } | < > ';
        const spaceErrorMessage = 'Message cannot contain consecutive space or more than 2 consecutive new lines (enter / return key).';
        const consecutiveSpecialCharErrorMessage = 'Message cannot contain consecutive hyphens (-) or periods (.).';
        const firstCharErrorMessage = 'Message cannot start with a space.';
    
        let sanitizedValue = value;
        let error = '';
    
        // Check for special characters
        if (specialCharRegex.test(value)) {
            error = errorMessage;
            sanitizedValue = sanitizedValue.replace(specialCharRegex, '');
        }
    
        // Replace more than 2 consecutive new lines with exactly 2 new lines
        if (consecutiveNewLineRegex.test(sanitizedValue)) {
            sanitizedValue = sanitizedValue.replace(consecutiveNewLineRegex, '\n\n');
            error = spaceErrorMessage;
        }
    
        // Replace consecutive space with a single space
        if (consecutiveSpaceRegex.test(sanitizedValue)) {
            sanitizedValue = sanitizedValue.replace(consecutiveSpaceRegex, ' ');
            error = spaceErrorMessage;
        }
    
        // Replace consecutive hyphens or periods with a single instance
        if (consecutiveSpecialCharRegex.test(sanitizedValue)) {
            sanitizedValue = sanitizedValue.replace(consecutiveSpecialCharRegex, match => match[0]);
            error = consecutiveSpecialCharErrorMessage;
        }
    
        // Check if the first character is a space
        if (sanitizedValue.startsWith(' ')) {
            sanitizedValue = sanitizedValue.trimStart();
            error = firstCharErrorMessage;
        }
    
        // Ensure that spaces and new lines are allowed after each other
        // Allow single space followed by a new line or a new line followed by a single space
        sanitizedValue = sanitizedValue.replace(/(\s\n|\n\s)/g, match => match);
    
        // Set errors and form details
        setInputErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        setFormDetails((prevDetails) => ({ ...prevDetails, [name]: sanitizedValue }));
        setValue(name, sanitizedValue, { shouldValidate: true });
    };

    const submitHandler = async () => {
        setButtonTxt('Sending...');
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(formDetails)
        });

        setButtonTxt("Send");
        const result = await response.json();

        setStatus({
            success: result.code === 200,
            message: result.code === 200 ? "Message Sent Successfully." : "Something Went Wrong, Please Try Again Later."
        });

        if (result.code === 200) {
            setFormDetails({ fullName: '', email: '', message: '' });
            setInputErrors({ fullName: '', email: '', message: '' });
        }
    };

    return (
        <section className="contact" id="connect" style={{ minHeight: heightState }}>
            <div className="contact-container" ref={containerRef}>
                <div className="canvas-container">
                    <Canvas ref={ref}>
                        <FadingImageDisplacement />
                    </Canvas>
                </div>
                <div className="contact-content" ref={contentRef}>
                    <h2>Get In Touch</h2>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Row>
                            {['fullName', 'email', 'message'].map((field, idx) => (
                                <Col key={idx} sm={12} className="px-1">
                                    {field === 'message' ? (
                                        <textarea
                                            className={` ${errors[field]?.message ? "invalidInput" : ""} ${inputErrors[field] ? "invalidInput" : ""}`}
                                            rows="6"
                                            name={field}
                                            placeholder={field === 'message' ? 'Message' : `Full ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                            {...register(field, {
                                                required: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`,
                                                minLength: { value: field === 'message' ? 5 : 4, message: `${field.charAt(0).toUpperCase() + field.slice(1)} needs ${field === 'message' ? 5 : 4} or more characters.` },
                                                maxLength: { value: field === 'message' ? 250 : 128, message: `${field.charAt(0).toUpperCase() + field.slice(1)} cannot exceed ${field === 'message' ? 250 : 128} characters.` },
                                                // pattern: field === 'email' ? {
                                                //     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                //     message: "Please enter a valid email address."
                                                // } : undefined
                                            })}
                                            value={formDetails[field]}
                                            onChange={(e) => {
                                                setFormDetails((prevDetails) => ({ ...prevDetails, [field]: e.target.value }));
                                                handleSanitization(e, field === 'fullName' ? /[^a-zA-Z\s]/g : (field === 'email' ? /[^\-@.\s]/g : /[^-@?!':/,.a-zA-Z0-9\s]/g), `${field.charAt(0).toUpperCase() + field.slice(1)} cannot contain special characters.`, /\s{2,}/g, `${field.charAt(0).toUpperCase() + field.slice(1)} cannot contain consecutive spaces.`, `${field.charAt(0).toUpperCase() + field.slice(1)} cannot start with a space.`);
                                            }}
                                        />
                                    ) : (
                                        <input
                                            className={` ${errors[field]?.message ? "invalidInput" : ""} ${inputErrors[field] ? "invalidInput" : ""}`}
                                            type={field === 'email' ? 'text' : 'text'} // Change email input type to text
                                            name={field}
                                            placeholder={field === 'fullName' ? 'Name' : `${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                            {...register(field, {
                                                required: `${field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)} is required.`,
                                                minLength: { value: 4, message: `${field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)} needs 4 or more characters.` },
                                                maxLength: { value: 128, message: `${field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)} cannot exceed 128 characters.` },
                                                pattern: field === 'email' ? {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Please enter a valid email address."
                                                } : field === 'fullName' ? {
                                                    value: /^[a-zA-Z ]*$/,
                                                    message: "Full Name cannot contain special characters."
                                                } : undefined
                                            })}
                                            value={formDetails[field]}
                                            // onChange={(e) => {
                                            //     setFormDetails((prevDetails) => ({ ...prevDetails, [field]: e.target.value }));
                                            //     // handleSanitization(e, field === 'email' ? /[^-@.\sa-zA-Z0-9]/g : (field === 'fullName' ? /[^a-zA-Z\s]/g : /[^-@.\sa-zA-Z0-9]/g), `${field.charAt(0).toUpperCase() + field.slice(1)} cannot contain special characters.`, /\s{2,}/g, `${field.charAt(0).toUpperCase() + field.slice(1)} cannot contain consecutive spaces.`, `${field.charAt(0).toUpperCase() + field.slice(1)} cannot start with a space.`);
                                            //     handleSanitization(e, field === 'email' ? /[^-@.\sa-zA-Z0-9]/g : /[^a-zA-Z\s]/g, `${field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)} cannot contain special characters.`, /\s{2,}/g, `${field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)} cannot contain consecutive spaces.`, `${field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)} cannot start with a space.`);

                                            //     // if (field === 'email') {
                                            //     //     handleEmailChange(e);
                                            //     // } else {
                                            //     //     handleSanitization(e, field === 'fullName' ? /[^a-zA-Z\s]/g : /[^-@.\sa-zA-Z0-9]/g, `${field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)} cannot contain special characters.`, /\s{2,}/g, `${field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)} cannot contain consecutive spaces.`, `${field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)} cannot start with a space.`);
                                            //     // }
                                            // }}

                                            // onChange={(e) => {
                                            //     const { name, value } = e.target;
                                            //     setFormDetails((prevDetails) => ({ ...prevDetails, [name]: value }));

                                            //     if (name === 'email') {
                                            //         handleEmailChange(e);
                                            //     } else {
                                            //         handleSanitization(
                                            //             e,
                                            //             name === 'fullName' ? /[^a-zA-Z\s]/g : /[^-@.\sa-zA-Z0-9]/g,
                                            //             name === 'fullName' ? 'Full Name cannot contain special characters.' : `${name.charAt(0).toUpperCase() + name.slice(1)} cannot contain special characters.`,
                                            //             /\s{2,}/g,
                                            //             name === 'fullName' ? 'Full Name cannot contain consecutive spaces.' : `${name.charAt(0).toUpperCase() + name.slice(1)} cannot contain consecutive spaces.`,
                                            //             name === 'fullName' ? 'Full Name cannot start with a space.' : `${name.charAt(0).toUpperCase() + name.slice(1)} cannot start with a space.`
                                            //         );
                                            //     }
                                            // }}

                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setFormDetails((prevDetails) => ({ ...prevDetails, [name]: value }));

                                                if (name === 'email') {
                                                    handleEmailChange(e);
                                                } else if (name === 'fullName') {
                                                    handleSanitization(
                                                        e,
                                                        /[^a-zA-Z\s]/g,
                                                        'Full Name cannot contain special characters.',
                                                        /\s{2,}/g,
                                                        'Full Name cannot contain consecutive spaces.',
                                                        'Full Name cannot start with a space.'
                                                    );
                                                } else {
                                                    handleSanitization(
                                                        e,
                                                        /[^-@.\sa-zA-Z0-9]/g,
                                                        `${name.charAt(0).toUpperCase() + name.slice(1)} cannot contain special characters.`,
                                                        /\s{2,}/g,
                                                        `${name.charAt(0).toUpperCase() + name.slice(1)} cannot contain consecutive spaces.`,
                                                        `${name.charAt(0).toUpperCase() + name.slice(1)} cannot start with a space.`
                                                    );
                                                }
                                            }}
                                        />
                                    )}
                                    {errors[field] && <p className="danger"><BiSolidErrorCircle /> {errors[field].message}</p>}
                                    {inputErrors[field] && <p className="danger"><BiSolidErrorCircle /> {inputErrors[field]}</p>}
                                </Col>
                            ))}
                            <Col sm={12} className="px-1">
                                <button type="submit"><span>{buttonTxt}</span></button>
                                {status.message && (
                                    <div className="row">
                                        <p className={status.success ? "success" : "danger"}>{status.message}</p>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
