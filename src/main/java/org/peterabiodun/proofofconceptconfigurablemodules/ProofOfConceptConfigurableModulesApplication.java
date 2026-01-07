package org.peterabiodun.proofofconceptconfigurablemodules;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.User;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@RequiredArgsConstructor
@Slf4j
public class ProofOfConceptConfigurableModulesApplication {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;    public static void main(String[] args) {
        SpringApplication.run(ProofOfConceptConfigurableModulesApplication.class, args);
    }

    @Bean
    public CommandLineRunner createAdminUser() {
        return args -> {
            // Check if admin already exists
            userRepository.findByEmail("admin@email.com").orElseGet(() -> {
                User admin = User.builder()
                        .name("admin")
                        .email("admin@email.com")
                        .password(passwordEncoder.encode("!@#Abc123")) // hashed password
                        .build();
                System.out.println("Saving admin user...");
                return userRepository.save(admin);
            });
        };
    }

}
