package com.ragtag.boardhub.repository;


import com.ragtag.boardhub.domain.Games;
import com.ragtag.boardhub.dto.GameSortDTO;

import java.util.List;

public interface GameRepository {


    List<Games> getList();

    List<Games> getListWithSort(GameSortDTO sort);

}
