import { useState } from "react"
import { BottomWarning } from "../Component/BottomWarning"
import { Button } from "../Component/Button"
import { Heading } from "../Component/Heading"
import { InputBox } from "../Component/InputBox"
import { SubHeading } from "../Component/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return <div className="signUpBackground h-full flex justify-center ">
    <div className="flex flex-col justify-center align-center">
      <div className="rounded-lg glassCard w-60 text-center h-max px-4">
        <SubHeading label={"Sign up"} size={"large"} />
        {/* <SubHeading label={"Enter your infromation to create an account"} /> */}
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="Himan" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="shu" label={"Last Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="himan@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            try {
              const response = await axios.post("http://localhost:3002/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
              });
              ////console.log(response.data);
              navigate("/Signin")
            } catch (err) {

              ////console.log(err)
            }
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}