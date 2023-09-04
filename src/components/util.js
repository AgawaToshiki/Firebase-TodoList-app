export function findByID(list, id){
    const i = list.findIndex((item) => item.id === id)
    return i
}