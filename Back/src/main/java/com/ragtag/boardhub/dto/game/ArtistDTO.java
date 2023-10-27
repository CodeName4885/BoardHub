package com.ragtag.boardhub.DTO.game;

import com.ragtag.boardhub.domain.game.Artists;
import lombok.Data;

@Data
public class ArtistDTO {

    private Long artistId;
    private String artist;
    private String translate;

    public ArtistDTO(Artists arti) {
        this.artistId = arti.getArtist_id();
        this.artist = arti.getArtist();
        this.translate = arti.getTranslate();
    }

}
