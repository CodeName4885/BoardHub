package com.ragtag.boardhub.DTO.game;

import java.time.LocalDateTime;

import com.ragtag.boardhub.domain.game.Comments;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GameComment {
    
    private Long commentId;
    private Long userId;
    private Long gameId;
    private String content;
    private LocalDateTime regDate;

    // 조인
    private String nickname;

    public GameComment(Comments comm) {
        this.commentId = comm.getComment_id();
        this.userId = comm.getUser_id();
        this.gameId = comm.getGame_id();
        this.content = comm.getContent();
        this.regDate = comm.getRegdate();

        this.nickname = comm.getNickname();
    }

    public Comments toEntity() {
        Comments comm = new Comments();
        comm.setGame_id(this.gameId);
        comm.setUser_id(this.userId);
        comm.setContent(this.content);
        return comm;
    }

}
