import axios from "axios";
import { getApi, postApi } from "./api_helper";
import * as url from "./url_helper";

// get partners
export const getPartners = query => getApi(`${url.GET_PARTNER}${query}`);
export const getPartnersById = id => getApi(`${url.GET_PARTNER_BY_ID}/${id}`)

//get club
export const getClub = () => getApi(url.GET_CLUB)
//https://api-alphazulu.vacancyrewards.com/api/clubes/

//coments from membership
export const getCommentsMembership = query => getApi(`${url.GET_COMMENTS_PARTNER}${query}`)
export const postComments = data => postApi(url.SAVE_COMMENTS_PARTNER, data)

//get topicos
export const getTopicos = () => getApi(url.GET_TOPICOS)

//get agentes
export const getAgents = () => getApi(url.GET_AGENTS)
