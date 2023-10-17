
export default class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then((file) => new Promise((resolve, reject) => {
            this._initRequest(resolve, reject, file);
        }));
    }

    _initRequest(resolve, reject, file) {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/', true); // Correct the URL
        xhr.responseType = 'json';

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = xhr.response;
                    if (!response || response.error) {
                        reject(response && response.error ? response.error.message : '파일을 업로드 할 수 없습니다.');
                    } else {
                        resolve({
                            default: response.url // 업로드된 파일 주소
                        });
                    }
                } else {
                    reject('파일을 업로드 할 수 없습니다.');
                }
            }
        };

        const data = new FormData();
        data.append('upload', file);
    }
}