import React, { useState } from "react";
import './contact.css';
import { useForm } from "react-hook-form";
import { BiSolidErrorCircle } from 'react-icons/bi';
import { Canvas } from "@react-three/fiber";
import { FadingImageDisplacement } from './FadingImageDisplacement';

const SPECIAL_CHAR_EMAIL_REGEX = /[^-_@.\sa-zA-Z0-9]/g;
const SPECIAL_CHAR_NAME_REGEX = /[^-.\sa-zA-Z]/g;
const SPECIAL_CHAR_MESSAGE_REGEX = /[`[\]\\/;~^_{}|<>]/g;
const CONSECUTIVE_ADJACENT_SPECIAL_CHAR_REGEX = /[-_.@]{2,}/g;
const CONSECUTIVE_SPACE_REGEX = / {2,}/g;
const CONSECUTIVE_NEW_LINE_REGEX = /\n{3,}/g;
const CONSECUTIVE_HYPHEN_PERIOD_REGEX = /([-]{2,})|([.]{2,})/g;
const INVALID_START_EMAIL_REGEX = /^[-_.@]/g;
const INVALID_START_NAME_REGEX = /^[ .-]/g;
const NO_SPACE_REGEX = /\s+/g;

const ERROR_MESSAGES = {
  email: {
    specialChar: 'Email cannot contain special characters except for hyphens (-), underscores (_), periods (.), and at signs (@).',
    noSpace: 'Email cannot contain spaces.',
    consecutiveSpecialChar: 'Email cannot contain consecutive or adjacent hyphens (-), underscores (_), periods (.), and at signs (@).',
    invalidStart: 'Email cannot start with a hyphen (-), underscore (_), period (.), or at sign (@).'
  },
  fullName: {
    specialChar: 'Full Name cannot contain numbers and special characters except for hyphens (-) and periods (.).',
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

  switch (type) {
    case 'email':
      if (SPECIAL_CHAR_EMAIL_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.email.specialChar;
        sanitizedValue = sanitizedValue.replace(SPECIAL_CHAR_EMAIL_REGEX, '');
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
      // Check for special characters except hyphens and periods
      if (SPECIAL_CHAR_NAME_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.fullName.specialChar;
        sanitizedValue = sanitizedValue.replace(SPECIAL_CHAR_NAME_REGEX, '');
      }

      // Check for consecutive spaces
      if (CONSECUTIVE_SPACE_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.fullName.consecutiveSpace;
        sanitizedValue = sanitizedValue.replace(CONSECUTIVE_SPACE_REGEX, ' ');
      }

      // Check for consecutive special characters
      if (CONSECUTIVE_ADJACENT_SPECIAL_CHAR_REGEX.test(sanitizedValue)) {
        error = ERROR_MESSAGES.fullName.consecutiveSpecialChar;
        sanitizedValue = sanitizedValue.replace(CONSECUTIVE_ADJACENT_SPECIAL_CHAR_REGEX, match => match[0]);
      }

      // Check for invalid starting characters
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

const Contact = () => {
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
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(formDetails)
      });
  
      setButtonText("Send");
      const result = await response.json();
  
      setStatus({
        success: response.ok && result.code === 200,
        message: response.ok && result.code === 200 ? "Message Sent Successfully." : "Something Went Wrong, Please Try Again Later."
      });
  
      if (result.code === 200) {
        setFormDetails({ fullName: '', email: '', message: '' });
        setInputErrors({ fullName: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({
        success: false,
        message: "Something Went Wrong, Please Try Again Later."
      });
      setButtonText("Send");
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <Canvas className="contact-bg">
          <FadingImageDisplacement />
        </Canvas>
        <div className="contact-content">
          <h2 className="old-standard-tt-bold">Get In Touch</h2>
          <form className="open-sans-regular" onSubmit={handleSubmit(onSubmit)}>
            {['fullName', 'email', 'message'].map((field, idx) => (
              <div key={idx}>
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
              </div>
            ))}
            <button className="open-sans-bold" type="submit"><span>{buttonText}</span></button>
            {status.message && (
              <div className="row">
                <p className={status.success ? "success" : "danger"}>{status.message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;