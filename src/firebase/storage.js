import { fs } from './init.js'

const storage = {
  upload: (location, file) => {
    let ref = fs.ref(location + '/' + file.name)
    let task = ref.put(file)
    return task
  },
  download: (location) => {
    // We need to use .then to chain a callback function,
    // so we must return a promise
    return new Promise((resolve, reject) => {
      // Retrieve the download URL from our fs ref
      fs.ref(location).getDownloadURL()
        // Actually download the file using fetch
        .then((url) => fetch(url)
          // Use response.blob() to get a Blob out of the response
          .then((response) => response.blob())
          // Use the FileReader API to read the blob's contents as text
          .then((blob) => {
            // let objectURL = window.URL.createObjectURL(blob)
            let reader = new FileReader()
            reader.onload = function () {
              resolve(reader.result)
            }
            reader.readAsText(blob)
          })
        )
    })
  },
  delete: (location) => { fs.ref(location).delete() }
}

export default storage
