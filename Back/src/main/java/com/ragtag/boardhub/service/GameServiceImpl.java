package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.game.*;
import com.ragtag.boardhub.DTO.game.*;
import com.ragtag.boardhub.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;

    @Override
    public List<GameResponse> getList() {
        return gameRepository.getList()
                .stream()
                .map(game -> new GameResponse(game))
                .collect(Collectors.toList());
    }

    @Override
    public List<GameResponse> getListWithSort(GameSortDTO sort) {
        return gameRepository.getListWithSort(sort)
                .stream()
                .map(game -> new GameResponse(game))
                .collect(Collectors.toList());
    }

    @Override
    public GameResponse findGameById(Long gameId) {
        Games findGame = gameRepository.findGameById(gameId);
        log.info("findGame : {}", findGame);
        GameResponse game = new GameResponse(findGame);
        log.info("game : {}", game);
        return game;
    }

    @Override
    public boolean updateGame(GameForm form) {
        boolean result = gameRepository.updateGame(form.toEntity());
        return result;
    }

    @Override
    public List<CategoryDTO> getCategoriesByGameId(Long gameId) {
        return gameRepository.getCategoriesByGameId(gameId)
                .stream()
                .map(cat -> new CategoryDTO(cat))
                .collect(Collectors.toList());
    }

    @Override
    public List<CategoryDTO> getCategoryList() {
        List<Categories> findList = gameRepository.getCategoryList();
        return findList.stream()
                .map(cat -> new CategoryDTO(cat))
                .collect(Collectors.toList());
    }

    @Override
    public GameDataDTO getAllDataList() {
        List<Categories> catList = gameRepository.getCategoryList();
        List<Mechanics> mechList = gameRepository.getMechanicList();
        List<Designers> desList = gameRepository.getDesignerList();
        List<Artists> artiList = gameRepository.getArtistList();
        List<Publishers> pubList = gameRepository.getPublisherList();
        return new GameDataDTO(catList, mechList, desList, artiList, pubList);
    }

    @Override
    public GameDataDTO getAllDataByGameId(Long gameId) {
        List<Categories> catList = gameRepository.getCategoriesByGameId(gameId);
        List<Mechanics> mechList = gameRepository.getMechanicsByGameId(gameId);
        log.info("mechList: {}" , mechList);
        List<Designers> desList = gameRepository.getDesignersByGameId(gameId);
        log.info("desList: {}" , desList);
        List<Artists> artiList = gameRepository.getArtistsByGameId(gameId);
        log.info("artiList: {}" , artiList);
        List<Publishers> pubList = gameRepository.getPublishersByGameId(gameId);
        log.info("pubList: {}" , pubList);
        return new GameDataDTO(catList, mechList, desList, artiList, pubList);
    }

    @Override
    public void mappingData(GameForm form) {
        // 카테고리 추가
        List<Long> categories = form.getCategories();
        if(categories != null){
            for (Long categoryId: categories) {
                int count = gameRepository.checkCatMapping(form.getGameId(), categoryId);
                if(count == 1) {
                    gameRepository.addCatMapping(form.getGameId(), categoryId);
                }
            }
        }

        // 게임 방식 추가
        List<Long> mechanics = form.getMechanics();
        if(mechanics != null) {
            for (Long mechanicId : mechanics) {
                int count = gameRepository.checkMechMapping(form.getGameId(), mechanicId);
                if (count == 1) {
                    gameRepository.addMechMapping(form.getGameId(), mechanicId);
                }
            }
        }

        // 룰 디자이너 추가
        List<Long> designers = form.getDesigners();
        if(designers != null) {
            for (Long designerId: designers) {
                int count = gameRepository.checkDesMapping(form.getGameId(), designerId);
                if(count == 1) {
                    gameRepository.addDesMapping(form.getGameId(), designerId);
                }
            }
        }

        // 게임 악세사리 아티스트 추가
        List<Long> artists = form.getArtists();
        if(artists != null) {
            for (Long artistId : artists) {
                int count = gameRepository.checkArtiMapping(form.getGameId(), artistId);
                if (count == 1) {
                    gameRepository.addArtiMapping(form.getGameId(), artistId);
                }
            }
        }

        // 게임 출판사 추가
        List<Long> publishers = form.getPublishers();
        if(publishers != null) {
            for (Long publisherId : publishers) {
                int count = gameRepository.checkPubMapping(form.getGameId(), publisherId);
                if (count == 1) {
                    gameRepository.addPubMapping(form.getGameId(), publisherId);
                }
            }
        }

    }

    @Override
    public void saveGameComment(GameComment comment) {
        gameRepository.saveGameComment(comment.toEntity());
    }

    @Override
<<<<<<< HEAD
    public Long getComentCountByGameId(Long gameId) {
        return gameRepository.getComentCountByGameId(gameId);
    }

    @Override
    public String getComentByGameId(Long gameId) {
        return gameRepository.getComentByGameId(gameId);
=======
    public List<GameComment> getAllCommentByGameId(Long gameId) {
        return gameRepository.getAllCommentByGameId(gameId).stream().map((comm) -> new GameComment(comm)).collect(Collectors.toList());
>>>>>>> hjy
    }


}
