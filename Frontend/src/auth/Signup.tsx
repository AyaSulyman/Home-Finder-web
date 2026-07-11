import React, {
  useState
} from "react";


import {
  useNavigate
} from "react-router-dom";


import {
  message
} from "antd";


import {
  EyeOutlined,
  EyeInvisibleOutlined
} from "@ant-design/icons";


import Header from "../property-details/Header/Header";

import styles from "./Signup.module.scss";


import {
  signupAction
} from "../actions/authActions";



const Signup: React.FC = () => {


  const navigate = useNavigate();



  const [role, setRole] = useState<
    "buyer" | "seller"
  >("buyer");



  const [formData, setFormData] = useState({

    firstName: "",

    lastName: "",

    email: "",

    phone: "",

    password: "",

    confirmPassword: "",

    acceptedTerms: false

  });



  const [loading, setLoading] = useState(false);



  const [showPassword, setShowPassword] =
    useState(false);



  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);





  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {


    const {
      name,
      value,
      type,
      checked

    } = e.target;



    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value

    });


  };





  const handleSubmit = async (
    e: React.FormEvent
  ) => {


    e.preventDefault();



    if (!formData.acceptedTerms) {


      message.warning(
        "Please accept the Terms and Privacy Policy"
      );


      return;

    }




    if (
      formData.password !==
      formData.confirmPassword
    ) {


      message.error(
        "Passwords do not match"
      );


      return;

    }




    setLoading(true);



    try {


      const response =
        await signupAction({

          ...formData,

          role

        });





      message.success(
        "Account created successfully"
      );



      console.log(
        "Signup Response:",
        response
      );



      setTimeout(() => {


        navigate("/login");


      }, 1000);




    } catch (error: unknown) {



      message.error(

        (error instanceof Error ? error.message : "Signup failed") ||
        "Signup failed"

      );



    } finally {


      setLoading(false);


    }


  };





  return (

    <div className={styles.page}>


      <Header active="home" />



      <main className={styles.signupPage}>


        <div className={styles.formWrap}>


          <p className={styles.eyebrow}>
            START YOUR JOURNEY
          </p>



          <h1 className={styles.title}>
            Create your HomeFinder account
          </h1>



          <p className={styles.subtitle}>
            Tell us how you want to use HomeFinder.
          </p>





          <form

            className={styles.form}

            onSubmit={handleSubmit}

          >




            <div className={styles.roleGrid}>



              <label

                className={
                  role === "buyer"
                    ? styles.roleCardActive
                    : styles.roleCard
                }

              >


                <input

                  type="radio"

                  name="role"

                  checked={
                    role === "buyer"
                  }

                  onChange={() =>
                    setRole("buyer")
                  }

                />



                <div>

                  <strong>
                    Buyer
                  </strong>


                  <span>
                    Find and save homes
                  </span>


                </div>


              </label>






              <label

                className={
                  role === "seller"
                    ? styles.roleCardActive
                    : styles.roleCard
                }

              >


                <input

                  type="radio"

                  name="role"

                  checked={
                    role === "seller"
                  }

                  onChange={() =>
                    setRole("seller")
                  }

                />



                <div>


                  <strong>
                    Seller / Agent
                  </strong>


                  <span>
                    List and manage properties
                  </span>


                </div>


              </label>


            </div>







            <div className={styles.twoColumns}>


              <div>


                <label className={styles.label}>
                  First name
                </label>


                <input

                  className={styles.input}

                  type="text"

                  name="firstName"

                  value={
                    formData.firstName
                  }

                  onChange={handleChange}

                  placeholder="Lina"

                  required

                />


              </div>






              <div>


                <label className={styles.label}>
                  Last name
                </label>


                <input

                  className={styles.input}

                  type="text"

                  name="lastName"

                  value={
                    formData.lastName
                  }

                  onChange={handleChange}

                  placeholder="Haddad"

                  required

                />


              </div>


            </div>








            <label className={styles.label}>
              Email address
            </label>



            <input

              className={styles.input}

              type="email"

              name="email"

              value={
                formData.email
              }

              onChange={handleChange}

              placeholder="you@example.com"

              required

            />







            <label className={styles.label}>
              Phone number
            </label>



            <input

              className={styles.input}

              type="tel"

              name="phone"

              value={
                formData.phone
              }

              onChange={handleChange}

              placeholder="+961 70 000 000"

              required

            />









            <div className={styles.twoColumns}>


              <div>


                <label className={styles.label}>
                  Password
                </label>



                <div className={styles.passwordWrapper}>


                  <input

                    className={styles.input}

                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }

                    name="password"

                    value={
                      formData.password
                    }

                    onChange={handleChange}

                    placeholder="••••••••"

                    required

                  />



                  <span

                    className={styles.eyeIcon}

                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }

                  >

                    {
                      showPassword
                        ?
                        <EyeInvisibleOutlined />
                        :
                        <EyeOutlined />
                    }


                  </span>


                </div>


              </div>







              <div>


                <label className={styles.label}>
                  Confirm password
                </label>




                <div className={styles.passwordWrapper}>


                  <input

                    className={styles.input}

                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }

                    name="confirmPassword"

                    value={
                      formData.confirmPassword
                    }

                    onChange={handleChange}

                    placeholder="••••••••"

                    required

                  />



                  <span

                    className={styles.eyeIcon}

                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }

                  >


                    {
                      showConfirmPassword
                        ?
                        <EyeInvisibleOutlined />
                        :
                        <EyeOutlined />
                    }



                  </span>



                </div>



              </div>



            </div>








            <label className={styles.checkbox}>


              <input

                type="checkbox"

                name="acceptedTerms"

                checked={
                  formData.acceptedTerms
                }

                onChange={handleChange}

              />


              <span>
                I agree to the Terms and Privacy Policy.
              </span>


            </label>







            <button

              className={styles.signupButton}

              type="submit"

              disabled={loading}

            >


              {
                loading
                  ?
                  "Creating Account..."
                  :
                  "Create Account"
              }



            </button>







            <p className={styles.adminNote}>

              Admin accounts are invitation-only and managed by HomeFinder staff.

            </p>




          </form>




        </div>



      </main>



    </div>


  );


};



export default Signup;
