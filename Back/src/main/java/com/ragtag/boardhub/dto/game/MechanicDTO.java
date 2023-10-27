package com.ragtag.boardhub.DTO.game;

import com.ragtag.boardhub.domain.game.Mechanics;
import lombok.Data;

@Data
public class MechanicDTO {

    private Long mechanicId;
    private String mechanic;
    private String translate;


    public MechanicDTO(Mechanics mech) {
        this.mechanicId = mech.getMechanic_id();
        this.mechanic = mech.getMechanic();
        this.translate = mech.getTranslate();
    }

}
