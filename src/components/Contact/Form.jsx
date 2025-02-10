import { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Form = () => {
  // const [formData, setFormData] = useState({
  //   Office: "",
  //   Email: "",
  //   PhoneNumber: "",
  //   Queries: "",
  //   _wpcf7_unit_tag: "3a82546",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formDataToSend = new FormData();
  //   for (const key in formData) {
  //     formDataToSend.append(key, formData[key]);
  //   }

  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/272/feedback`,
  //       formDataToSend,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       alert("Form submitted successfully!");
  //       setFormData({
  //         Office: "",
  //         Email: "",
  //         PhoneNumber: "",
  //         Queries: "",
  //         _wpcf7_unit_tag: "3a82546",
  //       });
  //     } else {
  //       alert("Failed to submit the form.");
  //     }
  //   } catch (error) {
  //     console.error("There was an error submitting the form!", error);
  //     alert("Failed to submit the form.");
  //   }
  // };

  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    PhoneNumber: "",
    _wpcf7_unit_tag: "3a82546",
    Agency: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, PhoneNumber: value });
    setErrors({ ...errors, PhoneNumber: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.FullName.trim()) {
      newErrors.FullName = "FullName is required.";
    }

    if (!formData.Email.trim()) {
      newErrors.Email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      newErrors.Email = "Invalid email address.";
    }

    if (!formData.PhoneNumber.trim()) {
      newErrors.PhoneNumber = "Phone number is required.";
    }

    if (!formData.Agency.trim()) {
      newErrors.Agency = "Agency name is required.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/272/feedback`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setSubmissionStatus("success");
        setFormData({
          FullName: "",
          Email: "",
          PhoneNumber: "",
          _wpcf7_unit_tag: "3a82546",
          Agency:"",
        });
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setSubmissionStatus("error");
    }
    // Clear submission status after 5 seconds
    setTimeout(() => setSubmissionStatus(null), 5000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full mt-5 xl:mt-10">
        <input
          className="w-full text-[13px] lg:text-[16px] py-[10px] px-[15px] xl:px-6 xl:py-[17.5px] border-[2px] border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F14] mb-[15px] xl:mb-8 placeholder-[#BD8F2F]"
          placeholder="Full Name"
          type="text"
          name="FullName"
          value={formData.FullName}
          onChange={handleChange}
        />
        <br />
        {errors.FullName && (
          <p className="text-red-500 text-sm">{errors.FullName}</p>
        )}
        <br />

        <input
          className="w-full text-[13px] lg:text-[16px] py-[10px] px-[15px] xl:px-6 xl:py-[17.5px] border-[2px] border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F14] mb-[15px] xl:mb-8 placeholder-[#BD8F2F]"
          type="email"
          placeholder="Email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
        />
        <br />
        {errors.Email && <p className="text-red-500 text-sm">{errors.Email}</p>}
        <br />

        <PhoneInput
          country={"ae"}
          value={formData.PhoneNumber}
          onChange={handlePhoneChange}
          inputProps={{
            name: "PhoneNumber",
          }}
        />
        {errors.PhoneNumber && (
          <p className="text-red-500 text-sm">{errors.PhoneNumber}</p>
        )}
        <br />

        <input
          className="w-full text-[13px] lg:text-[16px] py-[10px] px-[15px] xl:px-6 xl:py-[17.5px] border-[2px] border-[#BD8F2F] rounded-[30px] lg:rounded-[40px] bg-[#BD8F2F14] mb-[15px] xl:mb-8 placeholder-[#BD8F2F]"
          placeholder="Agency Name"
          type="text"
          name="Agency"
          value={formData.Agency}
          onChange={handleChange}
        ></input>
        <br />
        {errors.Agency && (
          <p className="text-red-500 text-sm">{errors.Agency}</p>
        )}

        <br />
        <button
          type="submit"
          className="w-full text-[16px] lg:text-[24px] py-[10px] px-[15px] xl:px-6 xl:py-[17.5px] border-[2px] border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F] text-white hover:bg-transparent hover:text-[#BD8F2F] transition-all"
        >
          Submit
        </button>
      </form>
      {submissionStatus === "success" && (
        <p className="text-themeSecondaryBlueGray text-center mb-5 text-wrap px-5 mt-[20px]">
          Thank you for reaching out! We’ll be in touch with you shortly.
        </p>
      )}
      {submissionStatus === "error" && (
        <p className="text-red-500 text-center mb-5 text-wrap px-5 mt-[20px]">
          Failed to submit the form. Please try again.
        </p>
      )}
    </>
  );
};

export default Form;
