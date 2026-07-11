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

import styles from "./Login.module.scss";


import {
  loginAction
} from "../actions/authActions";



const Login: React.FC = () => {


  const navigate = useNavigate();



  const [formData, setFormData] = useState({

    email: "",

    password: "",

    rememberMe: false

  });



  const [loading, setLoading] = useState(false);



  const [showPassword, setShowPassword] =
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



    setLoading(true);



    try {


      const response =
        await loginAction(
          formData
        );



      message.success(
        "Login successful"
      );



      const user =
        response.data.user;



      const token =
        response.data.token;



      localStorage.setItem(
        "token",
        token
      );



      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );





      setTimeout(() => {


        if(user.role === "buyer") {

          navigate(
            "/buyer-dashboard"
          );


        } else if(user.role === "seller") {

          navigate(
            "/seller-dashboard"
          );


        } else if(user.role === "admin") {

          navigate(
            "/admin-dashboard"
          );

        }


      },1000);




    } catch(error:any) {


      message.error(

        error.message ||
        "Login failed"

      );


    } finally {


      setLoading(false);


    }


  };





  return (

    <div className={styles.page}>


      <Header active="home" />



      <main className={styles.authLayout}>


        <section className={styles.formSide}>


          <div className={styles.formWrap}>


            <p className={styles.eyebrow}>
              WELCOME BACK
            </p>



            <h1 className={styles.title}>
              Log in to HomeFinder
            </h1>



            <p className={styles.subtitle}>
              Access your saved searches, listings, and appointments.
            </p>





            <form

              className={styles.form}

              onSubmit={handleSubmit}

            >



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







              <div className={styles.passwordRow}>


                <label className={styles.label}>
                  Password
                </label>



                <a href="#">
                  Forgot password?
                </a>


              </div>







             <div className={styles.passwordWrapper}>

  <input
    className={styles.input}
    type={
      showPassword
        ? "text"
        : "password"
    }
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="••••••••"
    required
  />


  <button
    type="button"
    className={styles.eyeButton}
    onClick={() =>
      setShowPassword(!showPassword)
    }
  >

    {
      showPassword
        ? <EyeInvisibleOutlined />
        : <EyeOutlined />
    }

  </button>


</div>




              <label className={styles.checkbox}>


                <input

                  type="checkbox"

                  name="rememberMe"

                  checked={
                    formData.rememberMe
                  }

                  onChange={handleChange}

                />



                <span>
                  Keep me signed in
                </span>


              </label>







              <button

                className={styles.loginButton}

                type="submit"

                disabled={loading}

              >

                {
                  loading
                    ?
                    "Logging in..."
                    :
                    "Log In"
                }


              </button>






              <div className={styles.divider}>
                or continue with
              </div>





              <div className={styles.socialRow}>


                <button
                  className={styles.socialButton}
                  type="button"
                >
                  Google
                </button>



                <button
                  className={styles.socialButton}
                  type="button"
                >
                  Apple
                </button>


              </div>






              <p className={styles.note}>

                Log in as a buyer, seller/agent, or admin — HomeFinder routes you to the right dashboard automatically.

              </p>




            </form>


          </div>


        </section>






        <section className={styles.visualSide}>


          <div className={styles.card}>


            <h2>
              $675,000
            </h2>


            <h3>
              Archer House · Lakeview
            </h3>


            <p>
              Viewing confirmed for Sat, 10:00 AM
            </p>


          </div>


        </section>



      </main>



    </div>

  );


};


export default Login;