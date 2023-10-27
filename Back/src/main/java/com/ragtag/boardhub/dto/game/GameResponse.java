package com.ragtag.boardhub.DTO.game;

import java.util.List;

import com.ragtag.boardhub.domain.game.Games;
import lombok.Data;

@Data
public class GameResponse {

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

    private List<Long> categories;
    private List<Long> mechanics;
    private List<Long> designers;
    private List<Long> artists;
    private List<Long> publishers;

    public GameResponse(Games game) {
        this.gameId = game.getGame_id();
        this.title = game.getTitle();
        this.orgTitle = game.getOrg_title();
        this.thumbnail = game.getThumbnail();
        this.image = game.getImage();
        this.releaseDate = game.getRelease_date();
        this.minPlayer = game.getMin_player();
        this.maxPlayer = game.getMax_player();
        this.playingTime = game.getPlaying_time();
        this.minAge = game.getMin_age();
    }

}
