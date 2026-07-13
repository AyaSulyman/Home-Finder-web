import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import styles from "./ContactForm.module.scss";
import { submitContactMessage } from "../../actions/contactActions";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

type SubmissionStatus = "idle" | "success" | "error";

const initialFormData: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s()-]{6,19}$/;

const ContactForm = () => {
  const [formData, setFormData] =
    useState<ContactFormData>(initialFormData);

  const [errors, setErrors] = useState<ContactFormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");

  const validateForm = (): ContactFormErrors => {
    const newErrors: ContactFormErrors = {};

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!fullName) {
      newErrors.fullName = "Full name is required.";
    } else if (fullName.length < 2) {
      newErrors.fullName =
        "Full name must contain at least 2 characters.";
    }

    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (phone && !phonePattern.test(phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!subject) {
      newErrors.subject = "Subject is required.";
    } else if (subject.length < 3) {
      newErrors.subject =
        "Subject must contain at least 3 characters.";
    }

    if (!message) {
      newErrors.message = "Message is required.";
    } else if (message.length < 10) {
      newErrors.message =
        "Message must contain at least 10 characters.";
    }

    return newErrors;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));

    const fieldName = name as keyof ContactFormErrors;

    if (errors[fieldName]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [fieldName]: undefined,
      }));
    }

    if (submissionStatus !== "idle") {
      setSubmissionStatus("idle");
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmissionStatus("idle");
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmissionStatus("idle");

    const cleanedFormData: ContactFormData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    try {
      await submitContactMessage(cleanedFormData);

      

      setSubmissionStatus("success");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.formCard}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>Send a message</span>

        <h2>How can we help?</h2>

        <p>
          Complete the form below and a member of our team will
          get back to you as soon as possible.
        </p>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">
              Full name <span aria-hidden="true">*</span>
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={
                errors.fullName ? "fullName-error" : undefined
              }
              className={
                errors.fullName ? styles.inputError : ""
              }
            />

            {errors.fullName && (
              <p
                id="fullName-error"
                className={styles.errorMessage}
                role="alert"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">
              Email address <span aria-hidden="true">*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              autoComplete="email"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "email-error" : undefined
              }
              className={errors.email ? styles.inputError : ""}
            />

            {errors.email && (
              <p
                id="email-error"
                className={styles.errorMessage}
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone number</label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              autoComplete="tel"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone ? "phone-error" : undefined
              }
              className={errors.phone ? styles.inputError : ""}
            />

            {errors.phone && (
              <p
                id="phone-error"
                className={styles.errorMessage}
                role="alert"
              >
                {errors.phone}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject">
              Subject <span aria-hidden="true">*</span>
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is your message about?"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={
                errors.subject ? "subject-error" : undefined
              }
              className={errors.subject ? styles.inputError : ""}
            />

            {errors.subject && (
              <p
                id="subject-error"
                className={styles.errorMessage}
                role="alert"
              >
                {errors.subject}
              </p>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">
            Message <span aria-hidden="true">*</span>
          </label>

          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how we can help you"
            rows={6}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "message-error" : undefined
            }
            className={errors.message ? styles.inputError : ""}
          />

          {errors.message && (
            <p
              id="message-error"
              className={styles.errorMessage}
              role="alert"
            >
              {errors.message}
            </p>
          )}
        </div>

        {submissionStatus === "success" && (
          <div
            className={styles.successMessage}
            role="status"
            aria-live="polite"
          >
            Thank you! Your message has been sent successfully.
          </div>
        )}

        {submissionStatus === "error" && (
          <div
            className={styles.submissionError}
            role="alert"
          >
            We could not send your message. Please try again.
          </div>
        )}

        <button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        <p className={styles.requiredNote}>
          Fields marked with <span>*</span> are required.
        </p>
      </form>
    </section>
  );
};

export default ContactForm;