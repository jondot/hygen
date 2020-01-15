import { createGlobalStyle } from 'styled-components'

const MainStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  table {
    border-collapse: collapse;
  }
  table,
  th,
  td {
    border: 1px solid black;
    padding: 5px;
  }

  html {
    font-size: 10px;
    color: #3a5975;
    font-weight: 400;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  li,
  ul {
    font-family: 'Source Sans Pro', 'Helvetica Neue', 'Helvetica', sans-serif;
    line-height: 3rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  dl {
    margin: 3rem 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #2c4761;
    margin-top: 6rem;
    font-weight: 300;
  }
  li,
  li > *,
  dt,
  dd {
    margin: 10px 0;
  }

  p code,
  li code {
    color: #f722b1;
  }

  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2.5rem;
  }
  h3 {
    font-size: 2rem;
  }
  h4 {
    font-size: 2rem;
  }
  h5 {
    font-size: 2rem;
  }
  h6 {
    font-size: 1.8rem;
  }

  p,
  a,
  li,
  dt,
  dd,
  tr,
  th {
    font-size: 1.8rem;
  }

  a {
    color: #2973b7;
    text-decoration: none;
  }
  @mixin custom-block($dark, $light) {
    background-color: $light;
    color: $dark;
    box-shadow: 0 0 0 1px $dark inset, 0 0 0 0 transparent;
    border-radius: 0.4rem;
    padding: 1rem 2rem;

    p {
      margin: 0;
      font-size: 1.6rem;
      line-height: 2rem;
    }

    h6 {
      margin: 0;
      padding: 0;
      color: $dark;
      font-size: 1.6rem;
      font-weight: bold;
    }
  }

  .custom-block-notice {
    @include custom-block(#b58105, #fff8db);
  }
  .custom-block-info {
    @include custom-block(#3a5875,#f9fbfd);
    code {
      font-size: 1.4rem;
    }
  }
`

export default MainStyle
