import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from "./UploadAdapter"; // Replace 'path-to-upload-adapter' with the actual file path

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
    };
}

export function CkEditor({ editorData, setEditorData }) { // editorData와 setEditorData를 props로 받음
    return (
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data); // 상태 업데이트
                }}
                config={{
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                }}
            />
    );
}
