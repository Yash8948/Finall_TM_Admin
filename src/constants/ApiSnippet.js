import React from 'react';
import { AUTH_TOKEN } from "./AuthConstant";
import { API_BASE_URL } from './ApiConstant';

const ApiSnippets = async (path, ApiData = null) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    var myHeaders = new Headers(); 
    myHeaders.append("Xtoken",token)
    // const formdata = new FormData();

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(ApiData),
    };

    // const fetchAndLog = async () => {
    const response = await fetch(API_BASE_URL+path, requestOptions);
    var json = await response.json();
    // just log ‘json’
    let stTrue = await json.status;
    // console.log(json);
    // }
    return json;
   
   
  }

export default ApiSnippets;














