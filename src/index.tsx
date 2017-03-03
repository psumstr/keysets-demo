import 'purecss';
import './main.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello } from "./components/Hello";

const root = document.getElementById('root');

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
  root
);
