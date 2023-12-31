package com.ragtag.boardhub.thread;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.json.JSONObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.*;

public class BggApiTranslation {
    public static void main(String[] args) {
        System.out.println("< BGG API >");

        Scanner scanner = new Scanner(System.in);
        TranslateThread translateThread = null;

        while (true) {
            printMainMenu();
            System.out.print("아래 행에 메뉴 입력: ");
            String selection = scanner.nextLine();

            if (selection.equals("")) {
                continue;
            } else {
                int menuNum = Integer.parseInt(selection);

                if (menuNum == 1) {
                    if (translateThread == null || !translateThread.isAlive()) {
                        translateThread = new TranslateThread();
                        translateThread.setDaemon(true);
                        translateThread.start();
                    } else {
                        System.out.println("이미 실행 중 입니다.");
                    }
                } else if (menuNum == 0) {
                    if (translateThread != null && translateThread.isAlive()) {
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


class TranslateThread extends Thread {
    private boolean running = true;

    @AllArgsConstructor
    @Getter
    public static class BggLinkDTO {
        Long id;
        String name;
        String translate;

        public BggLinkDTO(Long id, String name) {
            this.id = id;
            this.name = name;
        }
    }

    public void stopRunning() {
        running = false;
    }

    public void run() {
        int index = 1;
        while (running) {
            System.out.println("일하는 중...");
            updateTranslate(index);
        }
    }

    public void updateTranslate(int index) {
        try {
            Connection dbConnection = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:ORCL", "DUQUAN", "DUQUAN1234");
            String sqlSelectAll = "SELECT * FROM publishers WHERE translate is null";
            String sqlUpdate = "UPDATE publishers SET translate = ? WHERE publisher_id = ?";
            PreparedStatement preparedStatement = dbConnection.prepareStatement(sqlSelectAll);

            ResultSet resultSet = preparedStatement.executeQuery();

            List<BggLinkDTO> bggLinkList = new ArrayList<>();
            while (resultSet.next()) {
                Long id = resultSet.getLong("publisher_id");
                String name = resultSet.getString("publisher");

                BggLinkDTO type = new BggLinkDTO(id, name);
                bggLinkList.add(type);
            }

            for (BggLinkDTO type : bggLinkList) {
                System.out.println("ID: " + type.getId() + ", Name: " + type.getName());
                String translated = translateTxt(type.getName());
                PreparedStatement statement = dbConnection.prepareStatement(sqlUpdate);
                if(translated != null) {
                    statement.setString(1, translated);
                    statement.setLong(2, type.getId());
                    statement.executeUpdate();
                }
                Thread.sleep(5000);
            }

            preparedStatement.close();
            dbConnection.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("끝");
        stopRunning();
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

    public static Map<String, String> setHeaders(String clientId, String clientSecret) {
        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
        return requestHeaders;
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
