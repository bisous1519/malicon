package com.blahblah.gateway.exception.handler;

import com.blahblah.gateway.exception.JwtAuthenticationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.message.Message;
import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

@Slf4j
@Order(-1)
public class JwtExceptionHandler implements ErrorWebExceptionHandler {
    private Mono<Void> onError(ServerHttpResponse response, String message, HttpStatus status) {
        response.setStatusCode(status);
        String send = "{\"message\": \"" + message + "\"}";
        DataBuffer buffer = response.bufferFactory().wrap(send.getBytes(StandardCharsets.UTF_8));
        response.getHeaders().add("Content-Type", "application/json");
        return response.writeWith(Mono.just(buffer));
    }
    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
        ServerHttpResponse res =  exchange.getResponse();
        if(ex instanceof JwtAuthenticationException){
            JwtAuthenticationException e = (JwtAuthenticationException) ex;
            log.info("catch JwtAuthenticationException " + e.getMsg());

            return onError(res, e.getMsg(), e.getStatus());
        }
        ex.printStackTrace();
        return onError(res, ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
