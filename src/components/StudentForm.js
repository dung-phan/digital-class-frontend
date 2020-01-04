import React from "react";

export default function StudentForm(props) {
  return (
    <div className="student__form">
      <form onSubmit={props.onSubmit} className="student__form-content">
        <label>
          <h4>Name:</h4>
          <input
            type="text"
            name="name"
            onChange={props.onChange}
            value={props.values.name}
            className="student__form-input"
          />
        </label>
        <label>
          <h4>Photo:</h4>
          <input
            type="text"
            name="photo"
            onChange={props.onChange}
            value={props.values.photo}
            className="student__form-input"
          />
        </label>
        <button type="submit" className="btn btn-main btn-input">
          <h4>Save</h4>
        </button>
      </form>
    </div>
  );
}
