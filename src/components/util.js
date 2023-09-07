import { storage } from "./firebase"
import { ref, uploadBytes } from "firebase/storage"

export async function uploadImage(imageInfo){
    if(imageInfo.file){
        const storageRef = ref(storage, imageInfo.filePath)
        await uploadBytes(storageRef, imageInfo.file).then(() => {
            //処理が成功したら初期値へリセット
            imageInfo.localImageUrl = ""
            imageInfo.file = ""
            imageInfo.imageValue = ""
        },(error) => {
            alert(`${error}：画像を正常に登録できませんでした。`)
            return
        });
    }
}