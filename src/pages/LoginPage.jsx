import React from "react";

function LoginPage () {
  return (
    <section>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Your password" />
        </div>

        <button type="submit">Login</button>
      </form>
    </section>
  )
};

export default LoginPage;