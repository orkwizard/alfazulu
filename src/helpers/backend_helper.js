import axios from "axios";
import { getApi } from "./api_helper";
import * as url from "./url_helper";

// get partners
export const getPartners = query => getApi(`${url.GET_PARTNER}${query}`);

//get club
export const getClub = () => getApi(url.GET_CLUB)
//https://api-alphazulu.vacancyrewards.com/api/clubes/

//coments from membership
export const getCommentsMembership = query => getApi(`${url.GET_COMMENTS_PARTNER}${query}`)

//get topicos
export const getTopicos = () => getApi(url.GET_TOPICOS)
