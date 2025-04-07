import { Editor } from "@tinymce/tinymce-react";
import apiRequest from "../../services/apiFetchService";


const uploadHandler = (blobInfo) => new Promise( (resolve, reject) => {
  const formData = new FormData()
  formData.append('file', blobInfo.blob(), blobInfo.filename())
  
  const endpoint = '/resources'
  const options = {
      method: 'POST',
      body: formData
  }
  
  apiRequest(endpoint, options).then((res) => {
      if (res.status !== 201) {
        return res.clone().json().then((json) => {
          reject(json.error || `Unexpected HTTP status: ${res.status}`)
        })
      }
      return res.clone().json()
    })
    .then((json) => {
      resolve(json.location);
    }) 
    .catch((error) => {
      reject(error.message || 'Unexpected error during image upload');
  });
})

const TextEditor = ({ handleEditorChange }) => {
  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      initialValue=""
      init={{    
        selector: 'textarea',
        file_picker_types: 'image',
        height: 500,
        menubar: false,
        statusbar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
          'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
        ],
        plugin_base_url: '/tinymce/plugins',
        toolbar:
          'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | image | bullist numlist outdent indent | removeformat | help',
        automatic_uploads: true,
        images_upload_handler: uploadHandler,
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TextEditor;