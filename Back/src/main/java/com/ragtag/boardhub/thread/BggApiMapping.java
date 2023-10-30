package com.ragtag.boardhub.thread;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.*;
import java.util.*;

@RequiredArgsConstructor
public class BggApiMapping {
    public static void main(String[] args) {
        System.out.println("< BGG API >");

        Scanner scanner = new Scanner(System.in);
        MappingThread mappingThread = null;

        while (true) {
            printMainMenu();
            System.out.print("아래 행에 메뉴 입력: ");
            String selection = scanner.nextLine();

            if (selection.equals("")) {
                continue;
            } else {
                int menuNum = Integer.parseInt(selection);

                if (menuNum == 1) {
                    if (mappingThread == null || !mappingThread.isAlive()) {
                        mappingThread = new MappingThread();
                        mappingThread.setDaemon(true);
                        mappingThread.start();
                    } else {
                        System.out.println("이미 실행 중 입니다.");
                    }
                } else if (menuNum == 0) {
                    if (mappingThread != null && mappingThread.isAlive()) {
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
        System.out.println("\n0. 프로그램 종료");
        System.out.println("1. 일 시작\n");
    }
}


class MappingThread extends Thread {

    @AllArgsConstructor
    public static class BggLinkDTO {
        Long id;
        String name;
        String translate;

        public BggLinkDTO(Long id, String name) {
            this.id = id;
            this.name = name;
        }
    }

    public void run() {
        int index = 0;
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
        System.out.println("index = " + index);
        String urlString = "https://boardgamegeek.com//xmlapi2/hot?type=boardgame";
        String xml = urlRequest(urlString);
        // 문자열 -> JSON
        JSONArray itemArray = XML.toJSONObject(xml).getJSONObject("items").getJSONArray("item");
        int gameId = itemArray.getJSONObject(index).getInt("id");
        return gameId;
    }

    public static void getBggApi(int gameId) {
        System.out.println("gameId = " + gameId);
        String urlString = "https://boardgamegeek.com/xmlapi2/thing?id=" + gameId;
        String xml = urlRequest(urlString);
        // 문자열 -> JSON
        JSONObject item = XML.toJSONObject(xml).getJSONObject("items").getJSONObject("item");
        insert(item);
    }

    private static void insert(JSONObject item) {
        // 게임 고유번호 가져오기
        long gameId = item.getLong("id");
        // link 태그 가져오기
        JSONArray link = item.getJSONArray("link");
        System.out.println("link = " + link);

        try {
            Connection dbConnection = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:ORCL", "DUQUAN", "DUQUAN1234");
            String sqlInsertByType =
                    "INSERT INTO categorys(category_id, category) VALUES(?, ?)";
            PreparedStatement preparedStatement = dbConnection.prepareStatement(sqlInsertByType);

            String sqlInsertMapping = "INSERT INTO cate_mapping(category_id, game_id) VALUES(?, ?)";
            PreparedStatement mappingByType = dbConnection.prepareStatement(sqlInsertMapping);

            try {
                List<BggLinkDTO> linkList = getDTOList(link, "boardgamecategory");

                for(int i = 0; i < linkList.size(); i++) {
                    mappingByType.setLong(1, linkList.get(i).id);
                    mappingByType.setLong(2, gameId);
                    mappingByType.executeUpdate();

                    preparedStatement.setLong(1, linkList.get(i).id);
                    preparedStatement.setString(2, linkList.get(i).name);
//                    preparedStatement.setString(3, linkList.get(i).translate);
                    preparedStatement.executeUpdate();
                }

                mappingByType.close();
                preparedStatement.close();

                dbConnection.close();
            } catch (SQLIntegrityConstraintViolationException duplicateKeyException) {
                duplicateKeyException.printStackTrace();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static List<BggLinkDTO> getDTOList(JSONArray link, String type) {
        System.out.println("get DTO List");
        List<BggLinkDTO> list = new ArrayList<>();
        for(int i = 0; i < link.length(); i++) {
            JSONObject jsonObject = link.getJSONObject(i);
            String linkType = jsonObject.getString("type");
            if (linkType.equals(type)) {
                String name = jsonObject.getString("value");
                Long id = jsonObject.getLong("id");
//                String translated = translateEngOnly(name);
                BggLinkDTO bggDTO = new BggLinkDTO(id, name);
                list.add(bggDTO);
            }
        }
        return list;
    }

    public static String translateEngOnly(String text) {
        System.out.println("Translate Eng Only");
        String clientId = "1WDpV9oqcnZraYitmJHE"; // 애플리케이션 클라이언트 아이디값
        String clientSecret = "Ur8D51_adw"; // 애플리케이션 클라이언트 시크릿값
        String translateApiURL = "https://openapi.naver.com/v1/papago/n2mt";
        try {
            String translated = translateText(text, "en", clientId, clientSecret, translateApiURL);
            return translated;
        } catch(Exception e) {
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

    public static String translateText(String text, String sourceLang, String clientId, String clientSecret, String translateApiURL) throws Exception {
        System.out.println("Translate Text");
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
        System.out.println("Post");
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
