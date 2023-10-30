package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Reply;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ReplyRepository {
    Reply addReplyWithReview(Reply requestBody);

    List<Reply> getRepliesByCommId(Long comm_id);
}
