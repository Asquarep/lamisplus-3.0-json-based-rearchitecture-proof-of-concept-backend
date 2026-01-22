package org.peterabiodun.proofofconceptconfigurablemodules.config;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.ResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * Redirects every page to index.html
 * Used to handle the router
 */
@Slf4j
@Configuration
public class WebMvcConfigurerImpl implements WebMvcConfigurer {
    // Manually create a TaskExecutor and associate that with Spring.
    @Bean
    public ThreadPoolTaskExecutor mvcTaskExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setCorePoolSize(10);
        taskExecutor.setMaxPoolSize(10);
        return taskExecutor;
    }

    public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
        configurer.setTaskExecutor(mvcTaskExecutor());
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // PushState resolver for SPA routes
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(false)
                .addResolver(new PushStateResourceResolver());

        // Swagger UI and webjars
        registry.addResourceHandler("/swagger-ui/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/swagger-ui/4.21.1/"); // adjust version if needed
        registry.addResourceHandler("/swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/swagger-ui.html");
        registry.addResourceHandler("/v3/api-docs/**")
                .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }

    private class PushStateResourceResolver implements ResourceResolver {
        private Resource index = new ClassPathResource("/static/index.html");
        private List<String> handledExtensions = Arrays.asList(
                "html","js","json","csv","css","png","svg","eot","ttf","woff","appcache","jpg","jpeg","gif","ico"
        );

        // Exclude Swagger and API paths
        private List<String> ignoredPaths = Arrays.asList(
                "api", "v3/api-docs","swagger-ui","swagger-ui.html","webjars"
        );

        @Override
        public Resource resolveResource(HttpServletRequest request, String requestPath,
                                        List<? extends Resource> locations, ResourceResolverChain chain) {
            return resolve(requestPath, locations);
        }

        @Override
        public String resolveUrlPath(String resourcePath, List<? extends Resource> locations, ResourceResolverChain chain) {
            Resource resolvedResource = resolve(resourcePath, locations);
            if (resolvedResource == null) return null;
            try {
                return resolvedResource.getURL().toString();
            } catch (IOException e) {
                return resolvedResource.getFilename();
            }
        }

        private Resource resolve(String requestPath, List<? extends Resource> locations) {
            if (isIgnored(requestPath)) return null;

            if (isHandled(requestPath)) {
                return locations.stream()
                        .map(loc -> createRelative(loc, requestPath))
                        .filter(r -> r != null)
                        .findFirst()
                        .orElse(index);
            }
            return index;
        }

        private Resource createRelative(Resource resource, String relativePath) {
            try {
                return resource.createRelative(relativePath);
            } catch (IOException e) {
                return null;
            }
        }

        private boolean isIgnored(String path) {
            return ignoredPaths.stream().anyMatch(path::startsWith);
        }

        private boolean isHandled(String path) {
            String extension = StringUtils.getFilenameExtension(path);
            return extension != null && handledExtensions.contains(extension);
        }
    }


}