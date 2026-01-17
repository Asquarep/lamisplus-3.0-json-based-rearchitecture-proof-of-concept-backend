package org.peterabiodun.proofofconceptconfigurablemodules.config.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class SwaggerSkipFilter extends OncePerRequestFilter {

    private static final List<String> SWAGGER_WHITELIST = List.of(
            "/v3/api-docs",
            "/v3/api-docs/",
            "/v3/api-docs/**",
            "/swagger-ui.html",
            "/swagger-ui/**",
            "/swagger-resources/**",
            "/webjars/**",
            "/api-docs/**"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        for (String allowed : SWAGGER_WHITELIST) {
            if (path.startsWith(allowed.replace("/**", ""))) {
                filterChain.doFilter(request, response); // skip JWT check
                return;
            }
        }
        // continue normally
        filterChain.doFilter(request, response);
    }
}

