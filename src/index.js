import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire';
import firebaseConfig from './firebase-config'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <SuspenseWithPerf
      fallback={<p>Cargando la app...</p>}
      traceId={'loading-app-status'}>
        <App />
    </SuspenseWithPerf>
  </FirebaseAppProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
