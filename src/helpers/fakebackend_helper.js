import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);
    return null;
};

  //is user is logged in
const isUserAuthenticated = () => {
    return getLoggedInUser() !== null;
};

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data);

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_LOGIN, data);

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_PROFILE, data);

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data);

export {
    getLoggedInUser,
    isUserAuthenticated,
    postFakeLogin,
    postJwtLogin,
    postJwtProfile,
    postFakeProfile
  };