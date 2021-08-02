import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
  font-size: 62.5%; /* 16px x 62.5 = 10px = 1rem */
  box-sizing: border-box;
}
body {
  margin: 0;
  height: 100vh;
  font-size: 1.6rem;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#root {
  height: 100%;
}

main {
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
/* Common */
h1 {
  font-size: 1.8rem;
  padding: 1rem 0;
}
h2 {
  font-size: 1.6rem;
  padding: 1rem 0;
}

a {
  text-decoration: none;
}
a:hover {
  color: #ff8000;
}
ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
li {
  margin-top: 1rem;
}
input,
select,
textarea,
button {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 0.1rem #eeeeee solid;
  font-size: 1.6rem;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
button {
  background-color: #d8e3e7;
  cursor: pointer;
}
input:hover,
select:hover,
textarea:hover,
button:hover {
  border: 0.1rem #222831 solid;
}
button.primary {
  background-color: #f0c040;
}
button.block {
  width: 100%;
}
button.small {
  font-size: 1.2rem;
}
`;
export default GlobalStyle;
