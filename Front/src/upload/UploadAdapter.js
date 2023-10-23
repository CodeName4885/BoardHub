
export default class UploadAdapter {
    // 파일로더가 업로드 어뎁더를 사용하여 이미지를 서버에 전송함.
    constructor(loader) {
        this.loader = loader;
    }

    // 업로드를 시작한다
    upload() {
        // 파일로더의 진행상황을 업데이트 하자.
        server.onUploadProgress(data => {
            loader.uploadTotal = data.total;
            loader.uploaded = data.uploaded;
        });
        return this.loader.file
            .then((file) => new Promise((resolve, reject) => {
                this._initRequest();
                this._initListeners(resolve, reject, file);
                this.sendRequest(file);
            }));
    }

    _initRequest(resolve, reject, file) {
        const xhr = this.xhr = new XMLHttpRequest();
        // 여기서는 POST 요청과 json으로 응답을 받는다.
        xhr.open('POST', 'http://localhost:3000/', true); // POST 요청으로 전달받을 URL
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
        _initListeners(resolve, reject, file)
        {
            const xhr = this.xhr;
            const loader = this.loader;
            const genericErrorText = `Couldn't upload file: ${file.name}.`;
            xhr.addEventListener('error', () => reject(genericErrorText));
            xhr.addEventListener('abort', () => reject());
            xhr.addEventListener('load', () => {
                const response = xhr.response;
                // 이 예제에서 XHR서버에서 response 객체가 error와 함께 온다는 가정하에
                // 이 에러는 메세지를 가지며 업로드 promise의 매개변수로 넘어갈 수 있음.

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
        // 데이터를 준비하고 서버에 전송한다.
        _sendRequest(file)
        {
            // 폼 데이터 준비
            const data = new FormData();
            data.append('upload', file);

            this.xhr.send(data);
        }
    }
}
export default UploadAdapter;