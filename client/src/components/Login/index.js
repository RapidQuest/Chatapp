import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/Auth";
import { useHistory } from "react-router-dom";
import "./style.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const siginInRef = useRef();
  const { loginUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    setError("");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) {
      setError("Email is not provided");
      return;
    }

    if (!password) {
      setError("Password is not provided");
      return;
    }

    try {
      setLoading(true);
      await loginUser(email, password);
      history.push("/homepage");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  };

  useEffect(() => {
    const handleKeypress = (e) => {
      if (e.key === "Enter") {
        const activeEle = document.activeElement;
        const emailEle = emailRef.current;
        const passwordEle = passwordRef.current;

        const email = emailEle.value;
        const password = passwordEle.value;

        //if both are empty return
        if (!(password || email)) {
          return;
        }
        //if email is selected and password is empty
        if (activeEle === emailEle && !password) {
          passwordEle.focus();
          return;
        }
        //if passeord is selected and email is empty
        if (activeEle === passwordEle && !email) {
          emailEle.focus();
          return;
        }
        //if any one is empty
        if (!(password && email)) {
          return;
        }

        handleSubmit();
      }
    };

    window.addEventListener("keypress", handleKeypress);

    return () => window.removeEventListener("keypress", handleKeypress);
  }, []);

  return (
    <div className="login-main">
      <div className="login-wrapper">
        <p className="sigin-title">Sign In</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="input-wrapper">
          <label className="label" htmlFor="email">
            email
          </label>
          <input
            className="login-input"
            type="email"
            ref={emailRef}
            id="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="input-wrapper">
          <label className="label" htmlFor="password">
            password
          </label>
          <input
            className="login-input"
            type="password"
            ref={passwordRef}
            id="password"
            placeholder="Enter your password"
          />
        </div>

        <button
          ref={siginInRef}
          id="cool-hover"
          type="submit"
          disabled={loading}
          className="login-btn gradient-bg"
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
