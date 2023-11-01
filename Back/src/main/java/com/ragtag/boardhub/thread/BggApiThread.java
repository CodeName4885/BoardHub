package com.ragtag.boardhub.thread;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class BggApiThread {

    public static void main(String[] args) {
        System.out.println("< BGG API >");

        Scanner scanner = new Scanner(System.in);
        MyThread myThread = null;

        while (true) {
            printMainMenu();
            System.out.print("아래 행에 메뉴 입력: ");
            String selection = scanner.nextLine();

            if (selection.equals("")) {
                continue;
            } else {
                int menuNum = Integer.parseInt(selection);

                if (menuNum == 1) {
                    if (myThread == null || !myThread.isAlive()) {
                        myThread = new MyThread();
                        myThread.setDaemon(true);
                        myThread.start();
                    } else {
                        System.out.println("이미 실행 중 입니다.");
                    }
                } else if (menuNum == 0) {
                    if (myThread != null && myThread.isAlive()) {
                        System.out.println("일 종료");
                        break;
                    } else {
                        System.out.println("쉬는 중");
                    }
                    break;
                } else {
                    continue;
                }
            }
        }
        scanner.close();
    }

    public static void printMainMenu() {
        System.out.println("\n1. 일 시작");
        System.out.println("0. 프로그램 종료\n");
    }

}

class MyThread extends Thread {

    public void run() {
        int index = 36;
        while (true) {
            try {
                System.out.println("일하는 중...");
                int gameId = getBggHotness(index);
                Thread.sleep(3000);
                getBggApi(gameId);
                Thread.sleep(10000);
                index++;
                if(index == 50) {
                    break;
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static String urlRequest(String urlString) {
        try {
            System.out.println("OpenAPI 접속 URL: " + urlString);
            URL url = new URL(urlString);

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();

                // xml -> 문자열
                return response.toString();
            } else {
                System.out.println("HTTP request failed with response code: " + responseCode);
            }
        } catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public static int getBggHotness(int index) {
        String urlString = "https://boardgamegeek.com//xmlapi2/hot?type=boardgame";
        String xml = urlRequest(urlString);
        // 문자열 -> JSON
        JSONArray itemArray = XML.toJSONObject(xml).getJSONObject("items").getJSONArray("item");
        int gameId = itemArray.getJSONObject(index).getInt("id");
        return gameId;
    }

    public static void getBggApi(int gameId) {
        String urlString = "https://boardgamegeek.com/xmlapi2/thing?id=" + gameId;
        String xml = urlRequest(urlString);
        // 문자열 -> JSON
        JSONObject item = XML.toJSONObject(xml).getJSONObject("items").getJSONObject("item");
        insert(item);
    }

    private static void insert(JSONObject item) {
        System.out.println("item = " + item);
        // 게임 고유번호 가져오기
        long gameId = item.getLong("id");
        // 썸네일 정보 가져오기
        String thumbnail = item.getString("thumbnail");
        // 이미지 정보 가져오기
        String image = item.getString("image");
        // 원제 정보 가져오기
        String orgTitle = "";
        try {
            orgTitle = item.getJSONArray("name").getJSONObject(0).getString("value");
        } catch (Exception e) {
            orgTitle = item.getJSONObject("name").getString("value");
        }
        // 제작년도 가져오기
        int releaseDate = item.getJSONObject("yearpublished").getInt("value");
        // 플레이 최소인원 가져오기
        int minPlayers = item.getJSONObject("minplayers").getInt("value");
        // 플레이 최대인원 가져오기
        int maxPlayers = item.getJSONObject("maxplayers").getInt("value");
        // 게임 최소연령 가져오기
        int minAge = item.getJSONObject("minage").getInt("value");
        // 플레이 평균시간 가져오기
        int playingTime = item.getJSONObject("playingtime").getInt("value");
        // link 태그 가져오기
        JSONArray link = item.getJSONArray("link");

        String title = translateTxt(orgTitle);

        if(title == null) {
            System.out.println("gameId = " + gameId);
            return;
        }

        try {
            Connection dbConnection = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:ORCL", "DUQUAN", "DUQUAN1234");
            String sqlInsert =
                    "INSERT INTO games(game_id, org_title, title, thumbnail, image, release_date, min_player, max_player,playing_time, min_age) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement preparedStatement = dbConnection.prepareStatement(sqlInsert);

            try {
                // INSERT 쿼리 실행
                preparedStatement.setLong(1, gameId);
                preparedStatement.setString(2, orgTitle);
                preparedStatement.setString(3, title);
                preparedStatement.setString(4, thumbnail);
                preparedStatement.setString(5, image);
                preparedStatement.setInt(6, releaseDate);
                preparedStatement.setInt(7, minPlayers);
                preparedStatement.setInt(8, maxPlayers);
                preparedStatement.setInt(9, playingTime);
                preparedStatement.setInt(10, minAge);

                preparedStatement.executeUpdate();
                preparedStatement.close();

                dbConnection.close();
            } catch (SQLIntegrityConstraintViolationException duplicateKeyException) {
                duplicateKeyException.printStackTrace();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String translateTxt(String txt) {
        String translatedTitle = detectAndTranslate(txt);
        System.out.println("원제: " + txt);
        System.out.println("번역된 제목: " + translatedTitle);
        return translatedTitle;
    }

    public static String detectAndTranslate(String text) {
        String clientId = "1WDpV9oqcnZraYitmJHE"; // 애플리케이션 클라이언트 아이디값
        String clientSecret = "Ur8D51_adw"; // 애플리케이션 클라이언트 시크릿값

        String detectApiURL = "https://openapi.naver.com/v1/papago/detectLangs";
        String translateApiURL = "https://openapi.naver.com/v1/papago/n2mt";

        try {
            String detectedLang = detectLanguage(text, clientId, clientSecret, detectApiURL);
            String translatedText = translateText(text, detectedLang, clientId, clientSecret, translateApiURL);
            return translatedText;
        } catch (Exception e) {
            e.printStackTrace();
            return "번역 실패";
        }
    }

    public static Map<String, String> setHeaders(String clientId, String clientSecret) {
        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
        return requestHeaders;
    }

    public static String detectLanguage(String text, String clientId, String clientSecret, String detectApiURL) throws Exception {
        String encodedText = URLEncoder.encode(text, "UTF-8");
        Map<String, String> requestHeaders = setHeaders(clientId, clientSecret);

        String responseBody = post(detectApiURL, requestHeaders, "query=" + encodedText);
        JSONObject responseJson = new JSONObject(responseBody);
        String langCode = responseJson.getString("langCode");
        System.out.println("langCode = " + langCode);
        return langCode;
    }

    public static String translateText(String text, String sourceLang, String clientId, String clientSecret, String translateApiURL) throws Exception {
        String encodedText = URLEncoder.encode(text, "UTF-8");
        Map<String, String> requestHeaders = setHeaders(clientId, clientSecret);

        String postParams = "source=" + sourceLang + "&target=ko&text=" + encodedText;
        String responseBody = post(translateApiURL, requestHeaders,  postParams);
        JSONObject responseJson = new JSONObject(responseBody);
        String translatedText = "";
        try {
            translatedText = responseJson.getJSONObject("message").getJSONObject("result").getString("translatedText");
        }catch (Exception e) {
            System.out.println("responseJson = " + responseJson);
            return null;
        }
        return translatedText;
    }

    private static String post(String apiUrl, Map<String, String> requestHeaders, String text) {
        HttpURLConnection con = connect(apiUrl);
        String postParams =  text;
        try {
            con.setRequestMethod("POST");
            for(Map.Entry<String, String> header :requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            con.setDoOutput(true);
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.write(postParams.getBytes());
                wr.flush();
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
                return readBody(con.getInputStream());
            } else {  // 에러 응답
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private static HttpURLConnection connect(String apiUrl){
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection)url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private static String readBody(InputStream body){
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }


}





