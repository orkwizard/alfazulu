import axios from "axios";
import { getApi } from "./api_helper";
import * as url from "./url_helper";

// get partners
export const getPartners = query => getApi(`${url.GET_PARTNER}${query}`);

//get club
export const getClub = () => getApi(url.GET_CLUB)
