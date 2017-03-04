import 'purecss';
import './main.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Navbar from "./components/Navbar";

const root = document.getElementById('root');

ReactDOM.render(
    <Navbar />,
  root
);
