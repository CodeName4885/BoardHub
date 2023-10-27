package com.ragtag.boardhub.dto.game;

import com.ragtag.boardhub.domain.game.Games;
import lombok.Data;

@Data
public class GameForm {

    private Long gameId;
    private String title;
    private String orgTitle;
    private String thumbnail;
    private String image;
    private int releaseDate;
    private int minPlayer;
    private int maxPlayer;
    private int playingTime;
    private int minAge;

    public Games toEntity() {
        Games game = new Games();
        game.setGame_id(this.gameId);
        game.setTitle(this.title);
        game.setOrg_title(this.orgTitle);
        game.setThumbnail(this.thumbnail);
        game.setImage(this.image);
        game.setRelease_date(this.releaseDate);
        game.setMin_player(this.minPlayer);
        game.setMax_player(this.maxPlayer);
        game.setPlaying_time(this.playingTime);
        game.setMin_age(this.minAge);
        return game;
    }


}