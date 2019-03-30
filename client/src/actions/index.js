import axios from 'axios';
import {
  FETCH_USER,
  FETCH_JOBS,
  LOGIN_USER,
  LOGOUT_USER
} from './types';
// const jobs = [
//   {
//     "_id": "5c726e7afb6fc07201276504",
//     "title": "Job1",
//     "destination": "Karachi",
//     "lastDate": "30th Feb 2019",
//     "postDate": "15th Feb 2019",
//     "details": "Job1 details dfvcbnvbnbvnbvnfzdbgfdnhfgnghhgvdfbfgnfdgrdggtrjt3tgernjyth"
//   },
//   {
//     "_id": "5c726ed2fb6fc0720127651c",
//     "title": "Job2",
//     "destination": "Karachi",
//     "lastDate": "30th Feb 2019",
//     "postDate": "15th Feb 2019",
//     "details": "Job2 details dfvcbnvbnbvnbvnfzdbgfdnhfgnghhgvdfbfgnfdgrdggtrjt3tgernjyth"
//   },
//   {
//     "_id": "5c726eeafb6fc0720127653e",
//     "title": "Job3",
//     "destination": "Karachi",
//     "lastDate": "30th Feb 2019",
//     "postDate": "15th Feb 2019",
//     "details": "Job3 details dfvcbnvbnbvnbvnfzdbgfdnhfgnghhgvdfbfgnfdgrdggtrjt3tgernjyth"
//   },
//   {
//     "_id": "5c726f2bfb6fc0720127656e",
//     "title": "Job4",
//     "destination": "Karachi",
//     "lastDate": "30th Feb 2019",
//     "postDate": "15th Feb 2019",
//     "details": "dfvcbnvbnbvnbvnfzdbgfdnhfgnghhgvdfbfgnfdgrdggtrjt3tgernjyth"
//   },
//   {
//     "_id": "5c726f5bfb6fc07201276578",
//     "title": "Job5",
//     "destination": "Karachi",
//     "lastDate": "30th Feb 2019",
//     "postDate": "15th Feb 2019",
//     "details": "dfvcbnvbnbvnbvnfzdbgfdnhfgnghhgvdfbfgnfdgrdggtrjt3tgernjyth"
//   }
// ];

export function loginUser(formData) {
  return async dispatch => {
    const res = await axios.post('/api/login', formData);
    dispatch({ type: LOGIN_USER, payload: res.data });
  }
}
export function fetchUser() {
  return async (dispatch) => {
    const res = await  axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  }
}
export function fetchJobs() {

  return async (dispatch) => {
    console.log('fetch jobs called')
    const res = await  axios.get('/api/jobs'); // {data: {jobs}}; //

    dispatch({ type: FETCH_JOBS, payload: res.data });
  }
}

export function logout() {
  console.log('logout');
  return async dispatch => {
    const res = await axios.get('/api/logout');
    dispatch({ type: LOGOUT_USER, payload: res });
  }
}

export function apply(jobID){
  return async dispatch => {
    const apply = { jobID:jobID }
    const req = await axios.post('/api/apply', {apply});
    console.log(req.data.msg);
    dispatch({type: FETCH_JOBS, payload: req.data});
  }
}

export function addTask(newTask){
  return async dispatch => {
    console.log(newTask);
    const req = await axios.post('/api/addNew', newTask);
    console.log(req.data.msg);
    dispatch({type: FETCH_JOBS, payload: req.data});
  }
}


// single argument requires no parenthesis
// function with single statement equires no return
// async await replaces .then

/* dispatch({ type: FETCH_USER, payload: await axios.get('/api/current_user') });

  ==

  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res }); */