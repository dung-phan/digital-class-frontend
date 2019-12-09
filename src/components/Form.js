import React from "react";

export default function Form(props) {
  const { handleSubmit, handleChange, values } = props;
  const { email, password } = values;
  return (
    <div className="ui middle aligned center aligned grid">
      <div className="column form" style={{ maxWidth: 450 }}>
        <form className="ui large form" onSubmit={handleSubmit}>
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button className="ui submit button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
