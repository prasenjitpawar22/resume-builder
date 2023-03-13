import styled from "styled-components";
import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { LoginRequest } from "../api/UserApi";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../context/UserContext";

interface Data {
  email: string,
  password: string
}

const Login = () => {
  const [formData, setFormData] = useState<Data>({
    email: 'prasen@gmail.com', password: '12345'
  })
  const { setUser, user } = useContext(UserContext)
  const navigate = useNavigate()


  useEffect(() => {

    if (user?.logedIn) {
      navigate('/')
    }
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const res = await LoginRequest(formData)

    if (res.error) {
      toast.warning(res.error)
      return
    }

    if (res.data?.token && res.data.email) {
      localStorage.setItem('token', res.data?.token)
      setUser!({
        ...user, email: res.data?.email,
        logedIn: true, name: res.data?.name
      })
      return navigate('/')
    }
  }

  return (
    <div className="bg-login w-screen h-screen
            flex tablet:bg-login tablet:bg-large-size 
            desktop:bg-large-size justify-center items-center bg-no-repeat ">
      <Box
        className="phone:w-8/12 laptop:w-5/12 backdrop-blur-2xl drop-shadow-custom">
        <Fields className="w-8/12 py-12">
          <div className="flex flex-col justify-start">
            <PageBrandIcon className='rounded-full '
              src='./brand.png' />
            <h1 className="text-[38px] mb-4 font-gilroydark text-primary">Login</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="flex flex-col">
                <div className="flex flex-col mb-5">
                  <label className="text-primary text-[14px] mb-1">Email</label>
                  <input autoComplete="on" className="font-Lato rounded bg-gray-200 border-2 px-2 py-1 placeholder-[#BCBEC0] 
                   focus:border-purple-500 focus:outline-none focus:shadow-inner"
                    placeholder="username@gmail.com" type={"email"}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label className="text-primary text-[14px] mb-1">Password</label>
                  <input className="font-Lato rounded bg-gray-200 border-2 px-2 py-1 placeholder-[#BCBEC0] 
                   focus:border-purple-500 focus:outline-none focus:shadow-inner"
                    placeholder="********" type={"password"}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <Link className="font-Lato text-[12px] w-fit 
                  text-primary mb-8" to={'#'}>Forgot Password?</Link>
                <button
                  className="bg-[#F25019] hover:bg-[#d84616] rounded py-2 font-Lato
                text-[#FFFFFF] text-[20px] mb-4"
                  type="submit">Sign in</button>
                <p className="text-center text-primary text-[14px] mb-2">Or continue with</p>
                <p className="text-center text-primary text-[14px]">
                  Don't have an account yet?
                  <Link to={"/register"} className="font-Lato text-[14px] 
                  text-primary" > Register for free
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

export default Login;

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