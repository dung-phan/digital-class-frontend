import React from 'react';

export default function StudentForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <label>
        Name:
        <input
          type='text'
          name='name'
          onChange={props.onChange}
          value={props.values.name}
        />
      </label>

      <label>
        Photo:
        <input
          type='text'
          name='photo'
          onChange={props.onChange}
          value={props.values.photo}
        />
      </label>
      <button type='submit'>Save</button>
    </form>
  );
}
