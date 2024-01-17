// // import React, { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";

// // const Login = () => {
// //     const [username, setUsername] = useState("");
// //     const [password, setPassword] = useState("");
// //     const navigate = useNavigate();

// //     const handleSubmit = (e) => {
// //         if (username.trim() && password.trim()) {
// //             e.preventDefault();
// //             console.log({ username, password });
// //             setPassword("");
// //             setUsername("");
// //         }
// //     };

// //     return (
// //         <main className='login'>
// //             <form className='login__form' onSubmit={handleSubmit}>
// //                 <h2 className='login__title'>Log into your account</h2>
// //                 <label htmlFor='username'>Username</label>
// //                 <input
// //                     id='username'
// //                     name='username'
// //                     type='text'
// //                     value={username}
// //                     onChange={(e) => setUsername(e.target.value)}
// //                     className='username'
// //                 />
// //                 <label htmlFor='password'>Password</label>
// //                 <input
// //                     id='password'
// //                     type='password'
// //                     name='password'
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     className='password'
// //                 />
// //                 <button className='loginButton'>LOG IN</button>
// //                 <p style={{ textAlign: "center", marginTop: "30px" }}>
// //                     Don't have an account?{" "}
// //                     <Link className='link' to='/register'>
// //                         Create one
// //                     </Link>
// //                 </p>
// //             </form>
// //         </main>
// //     );
// // };

// // export default Login;

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (username.trim() && password.trim()) {
//       try {
//         // Call the login endpoint
//         await fetch("http://localhost:3000/getAuthorizationUrl", {
//           method: "GET",
//           credentials: "include", // Include credentials for cross-origin requests
//         });

//         // Call the getToken endpoint
//         await fetch("http://localhost:3000/getAuthorizationUrl", {
//           method: "GET",
//           credentials: "include", // Include credentials for cross-origin requests
//         });

//         // If successful, navigate to the desired page
//         navigate("/calendar");
//       } catch (error) {
//         console.error("Login or getToken failed", error);
//       }

//       // Clear the form fields
//       setPassword("");
//       setUsername("");
//     }
//   };

//   return (
//     <main className="login">
//       <form className="login__form" onSubmit={handleSubmit}>
//         <h2 className="login__title">Log into your account</h2>
//         <label htmlFor="username">Username</label>
//         <input
//           id="username"
//           name="username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="username"
//         />
//         <label htmlFor="password">Password</label>
//         <input
//           id="password"
//           type="password"
//           name="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="password"
//         />
//         <button type="submit" className="loginButton">
//           LOG IN
//         </button>
//         <p style={{ textAlign: "center", marginTop: "30px" }}>
//           Don't have an account?{" "}
//           <Link className="link" to="/register">
//             Create one
//           </Link>
//         </p>
//       </form>
//     </main>
//   );
// };

// export default Login;


// import React, { useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Redirect to the authorization URL when the component mounts
//     window.location.href = "http://localhost:3000/getAuthorizationUrl";
//   }, []); // The empty dependency array ensures that this effect runs only once

//   return (
//     <main className="login">
//       <p style={{ textAlign: "center", marginTop: "30px" }}>
//         Don't have an account?{" "}
//         <Link className="link" to="/register">
//           Create one
//         </Link>
//       </p>
//     </main>
//   );
// };

// export default Login;


import React,{ useEffect,useState }  from "react";
import { useNavigate,useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    // Parse the query parameters from the URL
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    if (code) {
      // Handle the code as needed, you can send it to your backend for further processing
      console.log("Authorization Code:", code);

      // If you want to perform some action after getting the code, you can do it here.
      // For example, you can navigate to the /calendar route.
      navigate("/calendar");
    } else {
      console.log("No authorization code found in the URL.");
    }
  }, [location, navigate]);

  const handleLogin = () => {
    // Redirect the user to the Microsoft Azure AD authorization URL
    window.location.href = "https://login.microsoftonline.com/f0c4b24d-851a-4404-9623-7e138b887664/oauth2/v2.0/authorize?client_id=ae9a483d-3839-48b3-a2a9-93bcfa41f2e1&response_type=code&redirect_uri=http://localhost:3000/response&response_mode=query&scope=https://graph.microsoft.com/.default&state=12345";
    
  };
  const handleCheckCalendar = () => {
    // Redirect to the /calendar route
    navigate("/calendar");
  };
  const getToken = () => {
    // Redirect to the /calendar route
    navigate("/getToken");
  };
  
  return (
    <main className="login">
      <div className="login__form">
        <h2 className="login__title">Log into your account</h2>
        {/* Your existing login form fields go here */}
        <button className="loginButton" onClick={handleLogin}>
          Log in with Microsoft
        </button>
        <button className="loginButton" onClick={handleCheckCalendar}>
        Check Calendar        
            </button>
            
        {/* Your existing registration link goes here */}
      </div>
    </main>
  );
};

export default Login;
