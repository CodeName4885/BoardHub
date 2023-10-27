package com.ragtag.boardhub.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final String BASE_URL = "http://localhost:3000";
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        return http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorizeRequests) ->{
                    authorizeRequests.requestMatchers("/join","/login","/profile","/mailconfirm","/usernamecheck","/activateuser","/api/game/list","/api/game/{id}","/api/game/{id}/categories","/getmainitem", "/kakaouserinfoadd", "/googleuserinfoadd", "/socialmypage").permitAll();
                    authorizeRequests.requestMatchers("/mypage","/refresh","/modifynickname","/modifyphone","/drawuser","/usernamechk","/emailchk","/getusername","/modifypassword").authenticated();
                    authorizeRequests.requestMatchers("/admin/**")
                            .hasRole("ADMIN");
                })
                .formLogin(formLogin ->
                        formLogin
                                .loginPage("http://localhost:3000/login")
                                .permitAll()
                )
                .logout(logout ->
                        logout
                                .logoutUrl("/logout")
                                .logoutSuccessUrl("/")
                )
                .addFilterAfter(jwtAuthenticationFilter, CorsFilter.class)
                .build();

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        corsConfig.setAllowedHeaders(Arrays.asList("*"));
        corsConfig.setAllowCredentials(true);
        corsConfig.setMaxAge(3600L);
        return request -> corsConfig;
    }
    //AuthenticationManager : 시큐리티에 인증을 담당. - UserDetailsService 구현, 클래스, PasswordEncoder 필요
        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)throws Exception{
            return configuration.getAuthenticationManager();
        }
    //BCryptPassword : 비밀번호 암호화 해주는 클래스 빈으로 등록 (시큐리티에서 비밀번호 암호화 강제함)
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
