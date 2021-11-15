import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { toast } from 'react-toastify';
import App from './App'
import { CohortProvider } from './contexts/cohort';

import 'react-toastify/dist/ReactToastify.min.css';
import './index.css'

import { ICON } from './_assets';

// TO-DO: access Netlify env vars
const PREVIEW = false; // process.env.CONTEXT !== 'production';

ReactDOM.render(
  <Router>
    <CohortProvider>
     <App />
    </CohortProvider>
  </Router>,
  document.getElementById('root')
)

envCheck();

function makeToast(emoji, msg){
  toast.info(msg, {
      position: "top-center",
      autoClose: false,
      draggable: true,
      icon: () => <span>{emoji}<img style={{ width: '20px'}} src={ICON} /></span>
  })
}

function envCheck(){
  if(PREVIEW){
    makeToast('🦺', 'This is a preview deploy!');

    makeToast('🔮', (
      <span>
        Want to look into the future?
        Add <code>?offset=num-of-weeks</code> to the url eg. <code>?offset=1</code>
      </span>
    ));
  }
}
