import React from "react";

function RegisterPage () {
  return (
    <section>
      <h2>Register</h2>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="Your name" />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Your password" />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" type="password" placeholder="Repeat password" />
        </div>

        <button type="submit">Register</button>
      </form>
    </section>
  )
};

export default RegisterPage;