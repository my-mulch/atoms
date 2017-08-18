import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Main from './components/Main'
import SecondSearch from './components/SecondSearch'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
        <Main />
 </Provider>,
  document.getElementById("root")
);
