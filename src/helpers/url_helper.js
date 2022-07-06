//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login";
export const POST_EDIT_PROFILE = "/post-fake-profile";


//URL API

//PARTNER
export const GET_PARTNER = "/socios/buscar"
export const GET_PARTNER_BY_ID = "/socios"
export const SAVE_PARTNER = "/socios/save"

//notas-comentarios
export const GET_COMMENTS_PARTNER = "/notas/buscar"
export const SAVE_COMMENTS_PARTNER = "/notas/save"

//CLUB
export const GET_CLUB = "/clubes/"

//topicos
export const GET_TOPICOS = "/notas/topicos"

//agente
export const GET_AGENTS = "/notas/agentes"

//idiomas
export const GET_IDIOMAS = "/idioma/"

//TIPOS de telefonos
export const GET_TIPOS_TELEFONOS = "/tipo_telefono/"

//parentezco
export const GET_PARENTESCO = "/parentesco/"

//email templates
export const GET_EMAIL_TEMPLATE_BY_ID = "/plantilla_correo"
export const SAVE_EMAIL_TEMPLATE = "/plantilla_correo/save"
export const GET_EMAIL_TEMPLATE_TYPES = "/plantilla_correo/tipos"
export const GET_EMAIL_TEMPLATE = "/plantilla_correo/buscar"
export const DELETE_EMAIL_TEMPLATE = "/plantilla_correo/delete"
export const GET_ETIQUETAS = "/plantilla_correo/etiquetas"
export const POST_SEND_EMAIL = "/plantilla_correo/send"
export const POST_SEND_LIST_EMAIL = "/plantilla_correo/sendList"

//licencias
export const GET_LICENCIA_BY_CONTRATO = "/licencia_membresia/nota_membresia"

//membresia
export const GET_MEMBRESIA_BY_ID = "/membresia"
export const SAVE_MEMBRESIA = "/membresia/save"
export const UPDATE_MEMBRESIA = "/membresia/actualizar"
export const ACTIVATE_MEMBRESIA = "/membresia/activate"

//renovaciones
export const GET_RENOVACION_BY_MEMBRESIA_ID = "/renovaciones/membresia"
export const SAVE_RENOVACION = "/renovaciones/salvar"

//sevicios o beneficios
export const GET_SERVICIOS = "/servicios"