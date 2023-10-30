package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.Reply;
import com.ragtag.boardhub.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService{
    private final ReplyRepository replyRepository;
    @Override
    public Reply addReplyWithReview(Reply requestBody) {
        return replyRepository.addReplyWithReview(requestBody);
    }

    @Override
    public List<Reply> getRepliesByCommId(Long comm_id) {
        return replyRepository.getRepliesByCommId(comm_id);
    }
}
