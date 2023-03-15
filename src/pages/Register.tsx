import styled from "styled-components";
import React, { FormEvent, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUserRequest } from "../api/UserApi";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { ClipLoader } from "react-spinners";

const Register = () => {

  const [registerData, setResgisterData] = useState({
    fullname: '', email: '', password: ''
  })
  const [registerBtnLoader, setRegisterBtnLoader] = useState<boolean>(false)

  const { setUser, user } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setRegisterBtnLoader(true)

    const registerResponse = await RegisterUserRequest(registerData)

    if (registerResponse.error) {
      toast.warn(registerResponse.error.message);
      setRegisterBtnLoader(false)
      return
    }

    if (registerResponse.data?.token && registerResponse.data.email) {
      localStorage.setItem('token', registerResponse.data?.token)
      setUser!({
        ...user, email: registerResponse.data?.email,
        logedIn: true, name: registerResponse.data?.name
      })
      setRegisterBtnLoader(false)
      return navigate('/')
    }
  }



  return (
    <div className="bg-login w-screen h-screen
            flex tablet:bg-login tablet:bg-large-size 
            desktop:bg-large-size justify-center items-center bg-no-repeat ">
      <Box
        className="phone:w-11/12 tablet:w-5/12 desktop:8/12 backdrop-blur-2xl drop-shadow-custom">
        <Fields className="w-8/12 py-12">
          <div className="flex flex-col justify-start">
            {/* <PageBrandIcon className='rounded-full '
              src='./brand.png' /> */}
            <h1 className="text-[38px] mb-4 font-gilroydark text-primary">Register</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="flex flex-col">
                <div className="flex flex-col mb-5">
                  <label className="text-primary text-[14px] mb-1">Full Name</label>
                  <input value={registerData.fullname} onChange={(e) => setResgisterData({ ...registerData, fullname: e.target.value })}
                    className="font-Lato rounded bg-gray-200 border-2 px-2 py-1 placeholder-[#BCBEC0] 
                   focus:border-purple-500 focus:outline-none focus:shadow-inner"
                    placeholder="Full name" type={"text"}
                  />
                </div>
                <div className="flex flex-col mb-5">
                  <label className="text-primary text-[14px] mb-1">Email</label>
                  <input value={registerData.email} onChange={(e) => setResgisterData({ ...registerData, email: e.target.value })}
                    className="font-Lato rounded bg-gray-200 border-2 px-2 py-1 placeholder-[#BCBEC0] 
                   focus:border-purple-500 focus:outline-none focus:shadow-inner"
                    placeholder="username@gmail.com" type={"email"}
                  />
                </div>
                <div className="flex flex-col mb-6">
                  <label className="text-primary text-[14px] mb-1">Password</label>
                  <input value={registerData.password} onChange={(e) => setResgisterData({ ...registerData, password: e.target.value })}
                    className="font-Lato rounded bg-gray-200 border-2 px-2 py-1 placeholder-[#BCBEC0] 
                   focus:border-purple-500 focus:outline-none focus:shadow-inner"
                    placeholder="********" type={"password"}
                  />
                </div>
                <button
                  className="bg-component-secondary hover:bg-component-primary rounded py-2 font-Lato
                text-[#FFFFFF] flex justify-center text-[20px] mb-4"
                  type="submit">
                  {!registerBtnLoader ? 'Register' :
                    <ClipLoader size={30} color={'white'} />}
                </button>
                <p className="text-center text-primary text-[14px] mb-2">Or continue with</p>
                <p className="text-center text-primary text-[14px]">
                  Already have an account?
                  <Link to={"/login"} className="font-Lato text-[14px] 
                  text-primary" > Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </Fields>
      </Box>
      <ToastContainer />
    </div >
  );
}

export default Register;

// const BackgroundDiv = styled.div`

// `
const Box = styled.div`
    background: rgba(255, 255, 255, 0.3);
    border-radius: 40px;
    display: flex;
    justify-content: center;
    position: absolute;
    align-items: center;
 
`
const Fields = styled.div`
  /* width: 70%;
  height: 80%; */
`
const PageBrandIcon = styled.img`
  width: 2rem;
  height: 2rem;
  
`