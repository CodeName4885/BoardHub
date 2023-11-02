package com.ragtag.boardhub.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ragtag.boardhub.domain.BlogNaver;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HttpClient {
    public static void main(String[] args) {
        String clientId = "MY2DR__4M4x9evlWXZ0Q"; // 애플리케이션 클라이언트 아이디
        String clientSecret = "YFhQ2zjENM"; // 애플리케이션 클라이언트 시크릿

        String text = null;
        try {
            text = URLEncoder.encode("보드게임 리뷰", "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("검색어 인코딩 실패", e);
        }

        String apiURL = "https://openapi.naver.com/v1/search/blog?query=" + text;

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
        String responseBody = get(apiURL, requestHeaders);

        List<BlogNaver> blogNaverList = createBlogNaverListFromApiResponse(responseBody);

        for (BlogNaver blogNaver : blogNaverList) {
            sendPostRequestToController(blogNaver);
        }
    }

    private static String get(String apiUrl, Map<String, String> requestHeaders) {
        HttpURLConnection con = connect(apiUrl);
        try {
            con.setRequestMethod("GET");
            for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }
            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                return readBody(con.getInputStream());
            } else {
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private static HttpURLConnection connect(String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection) url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private static String readBody(InputStream body) {
        InputStreamReader streamReader = new InputStreamReader(body);
        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();
            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }
            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는 데 실패했습니다.", e);
        }
    }

    private static List<BlogNaver> createBlogNaverListFromApiResponse(String responseBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode items = root.path("items"); // "items"에 검색 결과 목록이 들어있다.

            List<BlogNaver> blogNaverList = new ArrayList<>();
            for (JsonNode item : items) {
                BlogNaver blogNaver = new BlogNaver();
                blogNaver.setTitle(item.path("title").asText());
                blogNaver.setDescription(item.path("description").asText());
                blogNaver.setLink(item.path("link").asText());
                blogNaver.setImage_url(item.path("thumbnail").asText());

                blogNaverList.add(blogNaver);
            }

            return blogNaverList;
        } catch (JsonProcessingException e) {
            throw new RuntimeException("API 응답을 BlogNaver 객체 목록으로 변환하는 데 실패했습니다.", e);
        }
    }

    private static void sendPostRequestToController(BlogNaver blogNaver) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<BlogNaver> requestEntity = new HttpEntity<>(blogNaver, headers);

        String url = "http://localhost:8080/blogData"; // 애플리케이션의 엔드포인트 URL

        restTemplate.postForEntity(url, requestEntity, String.class);
    }
}