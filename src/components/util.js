// import { query, collection, onSnapshot} from "firebase/firestore"
// import { db } from "./firebase"

export function findByID(list, id){
    const i = list.findIndex((item) => item.id === id)
    return i
}