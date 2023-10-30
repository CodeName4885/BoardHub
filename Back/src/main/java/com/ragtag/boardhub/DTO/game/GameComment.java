package com.ragtag.boardhub.DTO.game;

import java.time.LocalDateTime;

import com.ragtag.boardhub.domain.game.Comments;

import lombok.Data;

@Data
public class GameComment {
    
    private Long commnetId;
    private Long userId;
    private Long gameId;
    private String content;
    private LocalDateTime regDate;

    // 조인
    private String username;

    public Comments toEntity() {
        Comments comm = new Comments();
        comm.setGame_id(this.gameId);
        comm.setUser_id(this.userId);
        comm.setContent(this.content);
        return comm;
    }

}
