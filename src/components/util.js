class BadRequestError extends Error {
    constructor(...arg) {
        super(...arg)
    }
}

class AuthError extends Error {
    constructor(...arg) {
        super(...arg)
    }
}

function errorHandler(error){
    console.error(error)
    if(error instanceof BadRequestError){
        return { status: 400, message: error.message || "BadRequestError" }
    }
    if(error instanceof AuthError){
        return { status: 401, message: error.message || "AuthError" }
    }
}

  export default {
    BadRequestError,
    AuthError,
    errorHandler
  }