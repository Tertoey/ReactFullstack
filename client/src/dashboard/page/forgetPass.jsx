import React, {useState} from 'react'
import { MuiOtpInput } from "mui-one-time-password-input";

function ForgetPass() {
    const [email, setEmail] = useState('');
    const [value, setValue] = useState("");
    const handleChange = (newValue) => {
      setValue(newValue);
    };

    const handleSendEmail = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const jsondata = {
            email: data.get('email'),
          }
        setEmail(data.get('email'))
          async function postJSON(jsondata) {
            try {
              const response = await fetch("http://127.0.0.1:8080/forget", {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(jsondata),
              });
              const result = await response.json();
              console.log("Success:", result);
              if(result.status==='ok'){
                alert(result.message)
              }if(result.status==='error'){
                alert(result.message)
              }
            } catch (error) {
              console.error("Error:", error);
            }
          }
          postJSON(jsondata);
      };

      const handleverifyResetPass = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const jsondata = {
            email: email,
            // otp: data.get('otp')
            otp:  value
          }
          async function postJSON(jsondata) {
            try {
              const response = await fetch("http://127.0.0.1:8080/verifyresetpass", {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(jsondata),
              });
              const result = await response.json();
              console.log("Success:", result);
              if(result.status==='ok'){
                alert(result.message)
                localStorage.setItem('data',JSON.stringify(jsondata))
                window.location='/resetpass'
              }if(result.status==='error'){
                alert(result.message)
              }
            } catch (error) {
              console.error("Error:", error);
            }
          }
          postJSON(jsondata);
      };
    
  return (
    <div className='bg-stone-200 h-screen'>
      <div className='forget-page'>
      <h1 className="text-center">Forget Password</h1>
      <div>
        <div className='forget-pass'>
          <div>
            <p>Please verify your email</p>
            <form onSubmit={handleSendEmail} className='mt-3'>
                <label htmlFor="">Enter email:</label><br/>
                <input type='email' name='email' required/><br/>
                <button className='submitButton'>Send email</button>
            </form>
          </div>
          <div>
          <p className='text-2xl'>Please Enter your OTP</p>
            <form onSubmit={handleverifyResetPass} className='mt-3'>
                <label htmlFor="">Enter OTP:</label><br/>
                <MuiOtpInput
                length={4}
                // onComplete={handleSubmit}
                value={value}
                onChange={handleChange}
                width={250}
                />
                {/* <input type="text" name='otp' required/><br/> */}
                <button className='submitButton'>Reset password</button>
            </form>
          </div>
        </div>
      </div>
      <div className='mt-3 text-end'>
        <a className='text-2xl hover:text-blue-700 hover:underline' href='/'>Back</a>
      </div>
      </div>
    </div>
  )
}

export default ForgetPass