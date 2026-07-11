import API_URL from "../config/api";

//Signup Action
export interface SignupData {

    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    password: string;

    confirmPassword: string;

    role: "buyer" | "seller";

    acceptedTerms: boolean;

}



export const signupAction = async (
    data: SignupData
) => {

    try {

        const response = await fetch(
            `${API_URL}/auth/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)

            }
        );


        const result = await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Signup failed"
            );

        }


        return result;


    } catch (error) {

        throw error;

    }

};



//Login Action
export interface LoginData {

    email: string;

    password: string;

    rememberMe: boolean;

}



export const loginAction = async (
    data: LoginData
) => {

    try {

        const response = await fetch(
            `${API_URL}/auth/login`,
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)

            }
        );


        const result = await response.json();



        if (!response.ok) {

            throw new Error(
                result.message ||
                "Login failed"
            );

        }



        return result;



    } catch (error) {

        throw error;

    }

};