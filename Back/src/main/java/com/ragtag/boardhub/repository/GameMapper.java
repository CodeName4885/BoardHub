package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Games;
import com.ragtag.boardhub.dto.GameSortDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GameMapper {


    List<Games> getList();

    List<Games> getListWithSort(GameSortDTO sort);

}
