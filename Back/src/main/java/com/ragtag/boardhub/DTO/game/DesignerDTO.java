package com.ragtag.boardhub.DTO.game;

import com.ragtag.boardhub.domain.game.Designers;
import lombok.Data;

@Data
public class DesignerDTO {

    private Long designerId;
    private String designer;
    private String translate;

    public DesignerDTO(Designers des) {
        this.designerId = des.getDesigner_id();
        this.designer = des.getDesigner();
        this.translate = des.getTranslate();
    }

}
