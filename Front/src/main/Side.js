import { useState } from "react";
import side from "../static/game-warrior/css/side.module.css"
import {AiOutlineCaretRight} from "react-icons/ai"
function Side(){
  const [isSideOpen, setIsSideOpen] = useState(false);  

  const handleSideTogle = ()=>{
    setIsSideOpen(!isSideOpen);
  }

  const sideWrapStyle = {
    left: isSideOpen ? "10px" : "-300px",
    transform: isSideOpen ? "translateX(0)" : "translateX(-10px)",
  };

  const sideBtnIconSttyle = {
    transform: isSideOpen ? "rotate(180deg)" : "rotate(0)",
    }
  return(
    <section className={side['side-wrap']} style={sideWrapStyle}>
      <div className={side['side-btn']} onClick={handleSideTogle}>
        <AiOutlineCaretRight className={side['side-btn-icon']} style={sideBtnIconSttyle} size={50} color="#FFE649"/>
      </div>
      <div className={side['side-header']}></div>
      <div className={side['side-body']}></div>
      <div className={side['side-footer']}></div>
    </section>
  );
}

export default Side;