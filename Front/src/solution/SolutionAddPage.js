import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { SolutionAddComponent } from "./SolutionAddComponent";
import { useState } from "react"; // Import useState

export function SolutionAddPage() {
    const [reviewContent, setReviewContent] = useState({ content: "" }); // Define state for content

    // Define the onChange function
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
        setReviewContent({ ...reviewContent, content: data });
        console.log(reviewContent);
    };

    return (
        <>
            <Header />
            <div className="App">
                <div className="review-container"></div>
                <br />
                <h2>제목</h2>
                <input type="text" placeholder="제목" name="title" />
                <SolutionAddComponent onChange={handleEditorChange} />
            </div>
            <Footer />
        </>
    );
}
