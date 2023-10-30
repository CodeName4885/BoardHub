package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Reply;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReplyRepositoryImpl implements ReplyRepository{
    private final ReplyMapper replyMapper;

    @Override
    public Reply addReplyWithReview(Reply requestBody) {
        return replyMapper.addReplyWithReview(requestBody);
    }

    @Override
    public List<Reply> getRepliesByCommId(Long comm_id) {
        return replyMapper.getRepliesByCommId(comm_id);
    }
}
