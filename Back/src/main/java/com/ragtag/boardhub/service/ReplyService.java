package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.Reply;

import java.util.List;

public interface ReplyService {
    Reply addReplyWithReview(Reply requestBody);

    List<Reply> getRepliesByCommId(Long comm_id);
}
