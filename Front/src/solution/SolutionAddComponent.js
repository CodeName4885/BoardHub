    import {useEffect, useState} from "react";
import { Editor } from '../upload/Editor';
import { useNavigate } from "react-router-dom";
    import {Call} from "../UserApiConfig/ApiService";

export function SolutionAddComponent() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('1');
    const [editorContent, setEditorContent] = useState(''); // 에디터 내용을 저장할 상태
    const navigate = useNavigate();

    const user_id = sessionStorage.getItem("USER_ID");
    const token = localStorage.getItem("ACCESS_TOKEN");
    const socialtoken = sessionStorage.getItem("TOKEN");
    const [userData, setUserData] = useState(null);
    console.log(userData);
    useEffect(() => {
        if (token !== null) {
            Call("/mypage", "POST", null)
                .then((response) => {
                    setUserData(response);
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                });
        }
        if(socialtoken !== null){
            const email = sessionStorage.getItem("USER_EMAIL");
            Call("/socialmypage", "POST", email)
                .then((response)=>{
                    setUserData(response);
                })

        }
    }, [token, socialtoken]);
    const cancleButtonSolution = () => {
        navigate("/solution/list");
    }

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/add/solution', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    category: category,
                    content: editorContent, // 에디터 내용을 전송
                    user_id: userData.user_id,
                }),
            });
            if (response.ok) {
                navigate("/solution/list");
                console.log('Form submitted successfully.');
            } else {
                console.error('Form submission failed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

       return (
        <form >
            <p className="solution-content">제목</p>
            <input className="add-Title"
                type="text"
                placeholder="제목"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <Editor
                value={editorContent} // 에디터 내용을 상태로 전달
                onChange={handleEditorChange} // 에디터 내용 변경 핸들러
            />
            <select className="add-select"
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
            >
                <option value="1">공략</option>
            </select>
            <button className="add-button" type="submit" onClick={handleSubmit} style={{ marginTop: '50px' }}>Submit</button>
            <button className="cancle-button" type="button" onClick={cancleButtonSolution}>cancle</button>
        </form>
    );
}