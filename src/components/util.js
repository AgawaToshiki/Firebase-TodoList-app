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

function LoginErrorHandler(error){
    if (error.code === 'auth/invalid-email') {
        return {
            message: error.message + "\nメールアドレスの型が正しくありません"
        }
      } else if(error.code === 'auth/user-disabled') {
        return {
            message: error.message + "\nユーザーが無効になっています"
        }
      } else if(error.code === 'auth/user-not-found') {
        // ユーザが存在しない
        return {
            message: error.message + "\nこのユーザーは存在しません"
        }
      } else if(error.code === 'auth/wrong-password') {
        // パスワードが間違っている
        return {
            message: error.message + "\nパスワードが間違っています"
        }
      } else if (error.code === 'auth/too-many-requests') {
        // 何度もパスワードを間違えた
        return {
            message: error.message + "\n短期間にパスワードを何度も間違えました"
        }
      } else {
        // その他
        return {
            message: error.message
        }
      }
}

  export default {
    BadRequestError,
    AuthError,
    FirestoreError,
    errorHandler,
    LoginErrorHandler
  }