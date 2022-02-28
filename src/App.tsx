import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { authenticationActions, authenticationState } from 'tt-frontend-hooks/Authentication';
import history from 'tt-frontend-history';
import Routes from 'tt-frontend-routes';
import queryString from 'query-string';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap';
import './web/theme/style.css';

function App() {
  return (
    <React.Fragment>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover />

      <Router history={history}>
        <Routes />
      </Router>
    </React.Fragment>
  );
}

export default App;
