export default class UploadAdapter {
    constructor(loader, server) {
        this.loader = loader;
        this.server = server;
    }

    upload() {
        // Use the 'server' object passed to the constructor
        this.server.onUploadProgress(data => {
            this.loader.uploadTotal = data.total;
            this.loader.uploaded = data.uploaded;
        });

        return this.loader.file.then((file) => new Promise((resolve, reject) => {
            this._initRequest(resolve, reject, file);
            this._initListeners(resolve, reject, file);
            this._sendRequest(file);
        }));
    }

    _initRequest(resolve, reject, file) {
        const xhr = this.xhr = new XMLHttpRequest();
        // Here, set up the XHR object.
        xhr.open('POST', 'http://localhost:3000/', true);
        xhr.responseType = 'json';

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = xhr.response;
                    if (!response || response.error) {
                        reject(response && response.error ? response.error.message : "파일을 업로드 할 수 없습니다.");
                    } else {
                        resolve({
                            default: response.url
                        });
                    }
                } else {
                    reject("파일을 업로드 할 수 없습니다.");
                }
            }
        };
    }

    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${file.name}`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            resolve({
                default: response.url
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    _sendRequest(file) {
        const data = new FormData();
        data.append('upload', file);

        this.xhr.send(data);
    }
}
