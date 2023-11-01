import {
    Avatar,
    Button as Btn,
    Flex,
    Form,
    Input,
    List,
    Modal,
    Popover,
    Typography,
    message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Call } from "../UserApiConfig/ApiService";
import {
    fetchCommentsByGameId,
    saveGameComment,
} from "./repositories/GameRepository";

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

export function GameCommentComponent() {
    const params = useParams();
    const { gameId } = params;
    const token = localStorage.getItem("ACCESS_TOKEN");
    const socialtoken = sessionStorage.getItem("TOKEN");
    const [userData, setUserData] = useState();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getLoginUserData().then((data) => {
            getAllComments(data);
        });
    }, [gameId]);

    async function getLoginUserData() {
        if (token !== null) {
            return Call("/mypage", "POST", null)
                .then((response) => {
                    setUserData(response);
                    return response;
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                });
        }
        if (socialtoken !== null) {
            const email = sessionStorage.getItem("USER_EMAIL");
            return Call("/socialmypage", "POST", email).then((response) => {
                setUserData(response);
                return response;
            });
        }
    }

    async function getAllComments(user) {
        await fetchCommentsByGameId(gameId).then((data) => {
            setComments(data);
            if (user) {
                const myComment =
                    comments.length > 0
                        ? comments.find((comm) => comm.userId === user.user_id)
                        : comments.userId == user.user_id && comments;
                setUserComment(myComment);
            }
        });
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
        const { user_id } = userData;
        const params = {
            gameId: gameId,
            userId: user_id,
            content: content,
        };
        console.log(params);
        await saveGameComment(params);
    }

    function onFinish(form) {
        const content = form.comment;
        setUserComment({
            ...userComment,
            content: content,
        });
        postComment(content);
        handleOk();
    }

    return (
        <>
            <div className="mt-4">
                <h2 style={{ fontWeight: "bold" }}>게임 한줄평</h2>
            </div>
            <div className="mt-2 col-md-5">
                {userData ? (
                    <div>
                        <TextArea
                            rows={4}
                            value={userComment ? userComment.content : ""}
                            style={{
                                resize: "none",
                                fontSize: 15,
                            }}
                            readOnly
                            onClick={onClick}
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
                    <Form.Item
                        name="comment"
                        initialValue={userComment ? userComment.content : ""}
                    >
                        <TextArea
                            rows={4}
                            value={userComment ? userComment.content : ""}
                            placeholder="최대 150자"
                            maxLength={150}
                            style={{
                                resize: "none",
                                marginTop: 5,
                                fontSize: 15,
                            }}
                        />
                    </Form.Item>
                    <Flex justify="flex-end" gap="small">
                        <Btn type="default" onClick={handleCancel}>
                            취소
                        </Btn>
                        {userData?.user_id == comments?.userId ? (
                            <Btn type="primary" htmlType="button">
                                수정
                            </Btn>
                        ) : (
                            <Btn type="primary" htmlType="submit">
                                완료
                            </Btn>
                        )}
                    </Flex>
                </Form>
            </Modal>
            <List
                itemLayout="horizontal"
                dataSource={comments}
                size="large"
                pagination={{
                    pageSize: 10,
                }}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    shape="square"
                                    // 프로필 이미지
                                />
                            }
                            title={
                                <Title level={5} style={{ paddingTop: 3 }}>
                                    {item.nickname}
                                </Title>
                            }
                            description={
                                <pre>
                                    <Text style={{ fontSize: 20 }}>
                                        {item.content}
                                    </Text>
                                </pre>
                            }
                        />
                    </List.Item>
                )}
            />
        </>
    );
}
