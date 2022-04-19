import axios from "axios";
import { deleteApi, getApi, postApi } from "./api_helper";
import * as url from "./url_helper";

// get partners
export const getPartners = query => getApi(`${url.GET_PARTNER}${query}`);
export const getPartnersById = id => getApi(`${url.GET_PARTNER_BY_ID}/${id}`)
export const savePartner = data => postApi(url.SAVE_PARTNER, data)

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

//get idiomas
export const getIdiomas = () => getApi(url.GET_IDIOMAS)

//get parentesco
export const getParentesco = () => getApi(url.GET_PARENTESCO)

//get tipos de telefonos
export const getTiposTelefonos = () => getApi(url.GET_TIPOS_TELEFONOS)

// email tamplates
export const saveEmailTemplate = (data) =>postApi(url.SAVE_EMAIL_TEMPLATE, data)
export const getEmailTemplateById = id => getApi(`${url.GET_EMAIL_TEMPLATE_BY_ID}/${id}`)
export const getEmailTemplatesTypes = () => getApi(url.GET_EMAIL_TEMPLATE_TYPES)
export const getEmailTemplates = query => getApi(`${url.GET_EMAIL_TEMPLATE}${query}`)
export const deleteEmailTemplate = (id) => deleteApi(`${url.DELETE_EMAIL_TEMPLATE}/${id}`)

//licencias/contrato
export const getLicencia = (id) => getApi(`${url.GET_LICENCIA_BY_CONTRATO}/${id}`)