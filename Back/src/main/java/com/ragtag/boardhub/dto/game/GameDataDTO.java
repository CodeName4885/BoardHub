package com.ragtag.boardhub.DTO.game;

import com.ragtag.boardhub.domain.game.*;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class GameDataDTO {

    private Long gameId;
    private List<CategoryDTO> catList;
    private List<MechanicDTO> mechList;
    private List<DesignerDTO> desList;
    private List<ArtistDTO> artiList;
    private List<PublisherDTO> pubList;

    public GameDataDTO(List<Categories> catList, List<Mechanics> mechList, List<Designers> desList, List<Artists> artiList, List<Publishers> pubList) {
        this.catList = catList.stream().map((cat) -> new CategoryDTO(cat)).collect(Collectors.toList());
        this.mechList = mechList.stream().map((mech) -> new MechanicDTO(mech)).collect(Collectors.toList());
        this.desList = desList.stream().map((des) -> new DesignerDTO(des)).collect(Collectors.toList());
        this.artiList = artiList.stream().map((arti) -> new ArtistDTO(arti)).collect(Collectors.toList());
        this.pubList = pubList.stream().map((pub) -> new PublisherDTO(pub)).collect(Collectors.toList());
    }

}
