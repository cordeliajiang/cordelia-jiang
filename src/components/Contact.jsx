import React, { useState, useRef, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import './contact.css';
import { Canvas } from "@react-three/fiber";
import { FadingImageDisplacement } from "./FadingImageDisplacement";
import { useForm } from "react-hook-form";
import { BiSolidErrorCircle } from 'react-icons/bi';
import useAutoHeight from './useAutoHeight';

const SPECIAL_CHAR_REGEX = /[^-_@.\sa-zA-Z0-9]/g;
const NO_SPACE_REGEX = /\s+/g;
const CONSECUTIVE_ADJACENT_SPECIAL_CHAR_REGEX = /[-_.@]{2,}/g;
const INVALID_START_EMAIL_REGEX = /^[-_.@]/g;
const INVALID_START_NAME_REGEX = /^[ .-]/g;
const SPECIAL_CHAR_MESSAGE_REGEX = /[`[\]\\/;~^_{}|<>]/g;
const CONSECUTIVE_SPACE_REGEX = / {2,}/g;
const CONSECUTIVE_NEW_LINE_REGEX = /\n{3,}/g;
const CONSECUTIVE_HYPHEN_PERIOD_REGEX = /([-]{2,})|([.]{2,})/g;

const ERROR_MESSAGES = {
  email: {
    specialChar: 'Email cannot contain special characters except for hyphens (-), underscores (_), periods (.), and at signs (@).',
    noSpace: 'Email cannot contain spaces.',
    consecutiveSpecialChar: 'Email cannot contain consecutive or adjacent hyphens (-), underscores (_), periods (.), and at signs (@).',
    invalidStart: 'Email cannot start with a hyphen (-), underscore (_), period (.), or at sign (@).'
  },
  fullName: {
    specialChar: 'Full Name cannot contain special characters except for hyphens (-) and periods (.).',
    consecutiveSpace: 'Full Name cannot contain consecutive spaces.',
    consecutiveSpecialChar: 'Full Name cannot contain consecutive or adjacent hyphens (-) or periods (.).',
    invalidStart: 'Full Name cannot start with a space, hyphen (-), or period (.).'
  },
  message: {
    specialChar: 'Message cannot contain the following special characters: ` [ ] \\ ; ~ ^ _ { } | < > ',
    consecutiveSpace: 'Message cannot contain consecutive spaces or more than 2 consecutive new lines (enter / return key).',
    consecutiveSpecialChar: 'Message cannot contain consecutive hyphens (-) or periods (.).',
    firstCharSpace: 'Message cannot start with a space.'
  }
};

const validateInput = (value, type) => {
  let error = '';
  let sanitizedValue = value;

  switch(type) {
    case 'email':
      if (SPECIAL_CHAR_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.email.specialChar;
        sanitizedValue = sanitizedValue.replace(SPECIAL_CHAR_REGEX, '');
      }
      if (NO_SPACE_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.email.noSpace;
        sanitizedValue = sanitizedValue.replace(NO_SPACE_REGEX, '');
      }
      if (CONSECUTIVE_ADJACENT_SPECIAL_CHAR_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.email.consecutiveSpecialChar;
        sanitizedValue = sanitizedValue.replace(CONSECUTIVE_ADJACENT_SPECIAL_CHAR_REGEX, match => match[0]);
      }
      if (INVALID_START_EMAIL_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.email.invalidStart;
        sanitizedValue = sanitizedValue.replace(INVALID_START_EMAIL_REGEX, '');
      }
      break;

    case 'fullName':
      if (SPECIAL_CHAR_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.fullName.specialChar;
        sanitizedValue = sanitizedValue.replace(SPECIAL_CHAR_REGEX, '');
      }
      if (CONSECUTIVE_SPACE_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.fullName.consecutiveSpace;
        sanitizedValue = sanitizedValue.replace(CONSECUTIVE_SPACE_REGEX, ' ');
      }
      if (CONSECUTIVE_ADJACENT_SPECIAL_CHAR_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.fullName.consecutiveSpecialChar;
        sanitizedValue = sanitizedValue.replace(CONSECUTIVE_ADJACENT_SPECIAL_CHAR_REGEX, match => match[0]);
      }
      if (INVALID_START_NAME_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.fullName.invalidStart;
        sanitizedValue = sanitizedValue.replace(INVALID_START_NAME_REGEX, '');
      }
      break;

    case 'message':
      if (SPECIAL_CHAR_MESSAGE_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.message.specialChar;
        sanitizedValue = sanitizedValue.replace(SPECIAL_CHAR_MESSAGE_REGEX, '');
      }
      if (CONSECUTIVE_NEW_LINE_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.message.consecutiveSpace;
        sanitizedValue = sanitizedValue.replace(CONSECUTIVE_NEW_LINE_REGEX, '\n\n');
      }
      if (CONSECUTIVE_SPACE_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.message.consecutiveSpace;
        sanitizedValue = sanitizedValue.replace(CONSECUTIVE_SPACE_REGEX, ' ');
      }
      if (CONSECUTIVE_HYPHEN_PERIOD_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.message.consecutiveSpecialChar;
        sanitizedValue = sanitizedValue.replace(CONSECUTIVE_HYPHEN_PERIOD_REGEX, match => match[0]);
      }
      if (sanitizedValue.startsWith(' ')) {
        error = ERROR_MESSAGES.message.firstCharSpace;
        sanitizedValue = sanitizedValue.trimStart();
      }
      break;

    default:
      break;
  }

  return { sanitizedValue, error };
};

const ContactForm = () => {
  const { heightState, contentRef, containerRef } = useAutoHeight();
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    canvas.height = 200 + canvas.width * 1.78;
  }, []);

  const [formDetails, setFormDetails] = useState({ fullName: '', email: '', message: '' });
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});
  const [inputErrors, setInputErrors] = useState({ fullName: '', email: '', message: '' });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const { sanitizedValue, error } = validateInput(value, name);

    e.target.value = sanitizedValue;

    setInputErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFormDetails((prevDetails) => ({ ...prevDetails, [name]: sanitizedValue }));
    setValue(name, sanitizedValue, { shouldValidate: true });
  };

  const onSubmit = async () => {
    setButtonText('Sending...');
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(formDetails)
    });

    setButtonText("Send");
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              {['fullName', 'email', 'message'].map((field, idx) => (
                <Col key={idx} sm={12} className="px-1">
                  {field === 'message' ? (
                    <textarea
                      className={`${errors[field]?.message || inputErrors[field] ? "invalidInput" : ""}`}
                      rows="6"
                      name={field}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      {...register(field, {
                        required: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`,
                        minLength: { value: field === 'message' ? 5 : 4, message: `${field.charAt(0).toUpperCase() + field.slice(1)} needs ${field === 'message' ? 5 : 4} or more characters.` },
                        maxLength: { value: field === 'message' ? 250 : 128, message: `${field.charAt(0).toUpperCase() + field.slice(1)} cannot exceed ${field === 'message' ? 250 : 128} characters.` },
                        pattern: field === 'email' ? {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Please enter a valid email address (e.g. abc@abc.com)."
                        } : undefined
                      })}
                      value={formDetails[field]}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <input
                      className={`${errors[field]?.message || inputErrors[field] ? "invalidInput" : ""}`}
                      type="text"
                      name={field}
                      placeholder={field === 'fullName' ? 'Name' : `${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      {...register(field, {
                        required: `${field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)} is required.`,
                        minLength: { value: 4, message: `${field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)} needs 4 or more characters.` },
                        maxLength: { value: 128, message: `${field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)} cannot exceed 128 characters.` },
                        pattern: field === 'email' ? {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Please enter a valid email address (e.g. abc@abc.com)."
                        } : undefined
                      })}
                      value={formDetails[field]}
                      onChange={handleInputChange}
                    />
                  )}
                  {errors[field] && <p className="danger"><BiSolidErrorCircle /> {errors[field].message}</p>}
                  {inputErrors[field] && <p className="danger"><BiSolidErrorCircle /> {inputErrors[field]}</p>}
                </Col>
              ))}
              <Col sm={12} className="px-1">
                <button type="submit"><span>{buttonText}</span></button>
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

export default ContactForm;
