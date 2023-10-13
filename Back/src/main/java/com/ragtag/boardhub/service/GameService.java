package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.Games;
import com.ragtag.boardhub.dto.GameSortDTO;

import java.util.List;

public interface GameService {


    List<Games> getList();

    List<Games> getListWithSort(GameSortDTO sort);

}
