package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Games;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GameMapper {


    List<Games> getList();

}
