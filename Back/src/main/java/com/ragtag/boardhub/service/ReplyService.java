package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.Reply;
import com.ragtag.boardhub.domain.Reply_Comment;

import java.util.List;

public interface ReplyService {
    Reply addReplyWithReview(Reply requestBody);

    List<Reply> getRepliesByCommId(Long comm_id);

    Reply addCommentWithReply(Reply_Comment replyComment);

    List<Reply_Comment> getCommentWithReply(Long reply_id);
}
