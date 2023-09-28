import { FirestoreError } from 'firebase/firestore'
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
    if(error instanceof BadRequestError){
        return { message: error.message || "BadRequestError" }
    }
    if(error instanceof AuthError){
        return { message: error.message || "AuthError" }
    }
    if(error instanceof FirestoreError){
        return { message: error.message || "FirestoreError" }
    }
}

  export default {
    BadRequestError,
    AuthError,
    FirestoreError,
    errorHandler
  }