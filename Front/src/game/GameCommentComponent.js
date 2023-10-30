import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    fetchCommentsByGameId,
    saveGameComment,
} from "./repositories/GameRepository";
import {
    Button as Btn,
    Popover,
    Modal,
    message,
    Input,
    Form,
    Flex,
} from "antd";

const { TextArea } = Input;

export function GameCommentComponent() {
    const params = useParams();
    const { gameId } = params;

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [commentValue, setCommentValue] = useState();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userId: 1,
    });
    const { userId } = user;

    useEffect(() => {
        getGameComment();
    }, [gameId]);

    async function getGameComment() {
        await fetchCommentsByGameId(gameId);
    }

    function onClick() {
        setOpen(true);
    }

    function handleCancel() {
        setOpen(false);
    }

    function handleOk(e) {
        success();
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    }

    function success() {
        messageApi.open({
            style: {
                marginTop: "21vh",
            },
            type: "warning",
            content: "잠시 기다려 주세요...",
            duration: 0,
        });
        setTimeout(messageApi.destroy, 2000);
    }

    async function postComment(content) {
        const params = {
            gameId: gameId,
            userId: userId,
            content: content,
        };
        console.log(params);
        await saveGameComment(params);
    }

    function onFinish(form) {
        const content = form.comment;
        setCommentValue(content);
        postComment(content);
        handleOk();
    }

    return (
        <>
            <div className="mt-4">
                <h2 style={{ fontWeight: "bold" }}>게임 한줄평</h2>
            </div>
            {/*     로그인 된 상태에서만 이용 가능 */}
            <div className="ml-2 mt-4 col-md-5">
                {user ? (
                    <div>
                        <TextArea
                            rows={4}
                            value={commentValue}
                            style={{
                                resize: "none",
                                marginTop: 5,
                            }}
                            readOnly
                            onClick={onClick}
                            copy
                        />
                    </div>
                ) : (
                    <Popover
                        title={"로그인이 필요한 서비스입니다."}
                        content={
                            <Btn
                                size="small"
                                type="link"
                                onClick={(e) => navigate("/login")}
                            >
                                로그인 하러 가기
                            </Btn>
                        }
                    >
                        <Btn onClick={onClick} type={"dashed"} disabled>
                            한줄평 작성
                        </Btn>
                    </Popover>
                )}
            </div>
            <Modal
                title="한줄평"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                style={{ top: "35%" }}
                footer={[]}
            >
                {contextHolder}
                <Form name="form" layout="vertical" onFinish={onFinish}>
                    <Form.Item name="comment">
                        <TextArea
                            rows={4}
                            placeholder="최대 150자"
                            maxLength={150}
                            style={{ resize: "none", marginTop: 5 }}
                            value={commentValue}
                        />
                    </Form.Item>
                    <Flex justify="flex-end" gap="small">
                        <Btn type="default" onClick={handleCancel}>
                            취소
                        </Btn>
                        <Btn type="primary" htmlType="submit">
                            완료
                        </Btn>
                    </Flex>
                </Form>
            </Modal>
            {/* <List   
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                                />
                            }
                            title={
                                <a href="https://ant.design">{item.title}</a>
                            }
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            /> */}
        </>
    );
}
