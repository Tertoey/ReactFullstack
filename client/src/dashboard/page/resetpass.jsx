import React from 'react'

function Resetpass() {
    const handleResetpass = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const resetPassdata =localStorage.getItem('data')
        const jsondata = {
            password: data.get('password'),
            data:JSON.parse(resetPassdata)
          }
          async function postJSON(jsondata) {
            try {
              const response = await fetch("http://127.0.0.1:8080/resetpass", {
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
                window.location='/';
                localStorage.removeItem('data')
              }if(result.status==='error'){
                alert(result.message)
              }
              if(result.errors){
                alert(result.errors[0].msg)
                }
            } catch (error) {
              console.error("Error:", error);
            }
          }
          postJSON(jsondata);
      };
  return (
    <div>
        <h1 className="text-center">Reset Password</h1><br/>
        <form onSubmit={handleResetpass}>
            <input type='text' name='password' required/>
            <button>reset password</button>
        </form>
    </div>
  )
}

export default Resetpass