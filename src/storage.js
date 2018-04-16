import { storage } from './firebase.js'

let upload = (location, file) => {
  let ref = storage.ref(location + '/' + file.name)
  let task = ref.put(file)
  return task
}

export {
  upload
}
