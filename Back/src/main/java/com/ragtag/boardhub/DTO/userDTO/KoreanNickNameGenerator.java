package com.ragtag.boardhub.DTO.userDTO;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Random;

@Data
@Component
public class KoreanNickNameGenerator {
    private final String[] firstWords = {
            "단아한", "우아한", "아름다운", "기특한", "차분한", "성실한", "용감한", "기쁜", "귀여운", "따뜻한",
            "깨끗한", "신비로운", "빛나는", "행운의", "호기심 많은", "자유로운", "밝은", "멋있는", "겸손한", "섬세한",
            "용감한", "반짝이는", "사랑스러운", "날렵한", "담백한", "긍정적인", "평화로운", "강인한", "도전적인", "똑똑한",
            "창의적인", "유연한", "정열적인", "강력한", "화려한", "쾌활한", "활발한", "민첩한", "영리한", "부드러운",
            "맑은", "강인한", "진지한", "흥미로운", "길잡이", "포근한", "신중한", "솔직한", "명랑한", "명석한"
    };
    private final String[] secondWords = {
            "호랑이", "까치", "사자", "코끼리", "치타", "늑대", "늘보", "고릴라", "사슴", "쥐",
            "고양이", "강아지", "말", "얼룩말", "낙타", "악어", "참새", "참나무", "꿀벌", "나비",
            "나무늘보", "바다표범", "판다", "펭귄", "참치", "고래", "상어", "게", "낙지", "문어",
            "오징어", "해파리", "문어", "낙지", "날다람쥐", "다람쥐", "사슴벌레", "거북이", "코뿔소", "코끼리",
            "북극곰", "백호", "부엉이", "까마귀", "페럿", "두더지", "바다사자", "해마", "바다코끼리"
    };
    private final Random random;

    public KoreanNickNameGenerator(){
        this.random = new Random();
    }

    public String generateNickName(){
        String first = firstWords[random.nextInt(firstWords.length)];
        String second = secondWords[random.nextInt(secondWords.length)];

        return first + second;
    }

}
