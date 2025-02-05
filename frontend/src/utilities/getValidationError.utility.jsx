export const getValidationError = (errorCode) => {
  const codeMatcher = {
    ERR_NETWORK: 'Error en la red',
    ERR_TIMEOUT: 'Se acabó el tiempo de espera',
    ERR_CANCEL: 'Se canceló la petición',
    ERR_BAD_REQUEST: 'El servidor no respondió',
    ERR_BAD_RESPONSE: 'El servidor no respondió',
    ERR_NAME_NOT_RESOLVED: 'Nombre no resuelto',
    ERR_UNKNOWN: 'Error desconocido',

    // Errores HTTP comunes
    ERR_400: 'Solicitud incorrecta (400)',
    ERR_401: 'No autorizado (401)',
    ERR_402: 'Pago requerido (402)',
    ERR_403: 'Prohibido (403)',
    ERR_404: 'No encontrado (404)',
    ERR_405: 'Método no permitido (405)',
    ERR_406: 'No aceptable (406)',
    ERR_407: 'Se requiere autenticación del proxy (407)',
    ERR_408: 'Tiempo de espera agotado (408)',
    ERR_409: 'Conflicto (409)',
    ERR_410: 'Recurso eliminado (410)',
    ERR_411: 'Longitud requerida (411)',
    ERR_412: 'Precondición fallida (412)',
    ERR_413: 'Entidad de solicitud demasiado grande (413)',
    ERR_414: 'URI demasiado larga (414)',
    ERR_415: 'Tipo de medio no soportado (415)',
    ERR_416: 'Rango no satisfactorio (416)',
    ERR_417: 'Expectativa fallida (417)',
    ERR_418: 'Soy una tetera (418)',
    ERR_429: 'Demasiadas solicitudes (429)',

    // Errores del servidor (5xx)
    ERR_500: 'Error interno del servidor (500)',
    ERR_501: 'No implementado (501)',
    ERR_502: 'Puerta de enlace incorrecta (502)',
    ERR_503: 'Servicio no disponible (503)',
    ERR_504: 'Tiempo de espera de la puerta de enlace agotado (504)',
    ERR_505: 'Versión HTTP no soportada (505)',
    ERR_507: 'Almacenamiento insuficiente (507)',
    ERR_508: 'Bucle detectado (508)',
    ERR_511: 'Se requiere autenticación de red (511)',
  };

  return codeMatcher[errorCode] || 'Error desconocido';
};