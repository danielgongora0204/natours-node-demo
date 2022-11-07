import { environment, environmentDefault } from './server';

function _stringify(response) {
  const object = {
    statusCode: response.statusCode,
    data: response.data,
    message: response.message
  };
  if (response.stack) {
    object.stack = response.stack;
  }
  return object;
}

export default class Response {
  statusCode;

  data;

  message;

  cookie;

  static Desc = {
    Unauthorized: {
      en: 'You are not authorized to do this operation.',
      es: 'No estas autorizado para hacer esta operación.'
    },
    TokenExpired: {
      en: 'This token has either expired or is invalid.',
      es: 'Este token ha expirado o es invalido.'
    },
    Permission: {
      en: 'You do not have permission to perform this operation.',
      es: 'No tienes permisos para realizar esta operación.'
    },
    LoginFailed: {
      en: 'Incorrect username and/or password.',
      es: 'Usuario y/o contraseña incorrectos.'
    },
    PasswordValidationFailed: {
      en: 'Incorrect password provided.',
      es: 'Contraseña proporcionada incorrecta.'
    },
    EmailDoesntExist: {
      en: 'This email address does not exist.',
      es: 'Este correo electronico no existe.'
    },
    ResourceNotFound: {
      en: 'This resource does not exist.',
      es: 'Este recurso no existe.'
    },
    CastError: {
      en: 'Invalid {path}: {value}.',
      es: 'Valor invalido {path}: {value}.'
    },
    DuplicateKey: {
      en: 'Duplicate field value: {value}.',
      es: 'Valor de campo duplicado: {value}.'
    },
    ValidationError: {
      en: 'Invalid input data.',
      es: 'Datos de entrada no válidos.'
    },
    EmptyRequest: {
      en: 'Empty input data.',
      es: 'Datos de entrada vacios.'
    },
    GenericError: {
      en: 'An unknown error occurred.',
      es: 'Un error desconocido a ocurrido.'
    }
  };

  static ReplacementKeyWords = {
    Path: '{path}',
    Value: '{value}'
  };

  static Codes = {
    // 1×× Informational
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,

    // 2×× Success
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultistatusCode: 207,
    AlreadyReported: 208,
    IMUsed: 209,

    // 3×× Redirection
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,

    // 4×× Client Error
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    RequestURITooLong: 414,
    UnsupportedMediaType: 415,
    RequestedRangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    ConnectionClosedWithoutResponse: 444,
    UnavailableForLegalReasons: 451,
    ClientClosedRequest: 499,

    // 5×× Server Error
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HTTPVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
    NetworkConnectTimeoutError: 599
  };

  constructor(
    statusCode,
    data = undefined,
    message = undefined,
    cookie = undefined,
    stack = undefined
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    if (cookie) {
      this.cookie = cookie;
    }
    if (environment === environmentDefault && stack) {
      this.stack = stack;
    }
  }

  stringify() {
    return _stringify(this);
  }

  static replaceKeyWord(descriptions, changes) {
    changes.forEach((element) => {
      descriptions.en = descriptions.en.replace(
        element.text,
        element.replacement
      );
      descriptions.es = descriptions.es.replace(
        element.text,
        element.replacement
      );
    });
    return descriptions;
  }

  static stringify(statusCode, data, message) {
    const response = new Response(statusCode, data, message);
    return response.stringify();
  }

  static ok(data, message, cookie = undefined) {
    const response = new Response(Response.Codes.Ok, data, message, cookie);
    return response;
  }

  static created(data, message, cookie = undefined) {
    const response = new Response(
      Response.Codes.Created,
      data,
      message,
      cookie
    );
    return response;
  }

  static nocontent(cookie = undefined) {
    const response = new Response(
      Response.Codes.NoContent,
      undefined,
      undefined,
      cookie
    );
    return response;
  }

  static updated(data, message, cookie = undefined) {
    const response = new Response(
      Response.Codes.Accepted,
      data,
      message,
      cookie
    );
    return response;
  }

  static error(statusCode, data, message, stack) {
    const response = new Response(statusCode, data, message, undefined, stack);
    return response;
  }

  static notFound(data) {
    const response = new Response(
      Response.Codes.NotFound,
      data,
      Response.Desc.ResourceNotFound
    );
    return response;
  }

  static unauthorized(data, message, statusCode = Response.Codes.Unauthorized) {
    const response = new Response(statusCode, data, message);
    return response;
  }
}
