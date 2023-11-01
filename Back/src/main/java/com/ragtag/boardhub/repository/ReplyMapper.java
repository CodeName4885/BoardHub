package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Reply;
import com.ragtag.boardhub.domain.Reply_Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReplyMapper {
    Reply addReplyWithReview(Reply requestBody);
    List<Reply> getRepliesByCommId(Long comm_id);

    Reply addCommentWithReply(Reply_Comment replyComment);

    List<Reply_Comment> getCommentWithReply(Long reply_id);
}
