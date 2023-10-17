import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from "./UploadAdapter"; // Replace 'path-to-upload-adapter' with the actual file path

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
    };
}

export function CkEditor() {
    const [editorData, setEditorData] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted with data:', editorData);
    };

    const handleCancel = () => {
        // Add your cancel logic here
        console.log('Form cancelled');
    };

    return (
        <form onSubmit={handleSubmit}>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                }}
                config={{
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                }}
            />
            <div>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
