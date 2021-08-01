import React, { useState } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    > button {
      border-radius: 0 0.5rem 0.5rem 0;
      border-right: none;
      margin-right: 0.5rem;
    }
    > input {
      border-radius: 0.5rem 0 0 0.5rem;
      border-right: none;
      margin-left: 0.5rem;
      flex-grow: 2;
    }
  }
`;

const SearchBox = (props) => {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <FormWrapper onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          placeholder="Search products"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </FormWrapper>
  );
};

export default SearchBox;
