import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ handleEditorChange }) => {
  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      initialValue=""
      init={{    
        height: 500,
        menubar: false,
        statusbar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'print', 'preview', 'anchor',
          'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'paste', 'code', 'help', 'wordcount',
        ],
        plugin_base_url: '/tinymce/plugins',
        toolbar:
          'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
        // images_upload_handler: (blobInfo) => {
        //   // Aquí puedes definir la lógica personalizada para subir imágenes
        //   const formData = new FormData();
        //   formData.append('file', blobInfo.blob(), blobInfo.filename());
        //   console.log(blobInfo)
        // },
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TextEditor;