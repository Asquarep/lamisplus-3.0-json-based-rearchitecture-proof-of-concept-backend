package com.peterabiodun.eventsmanagementmusala.service.notificationservice;

import com.peterabiodun.eventsmanagementmusala.exception.MailSenderException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String to, String subject, String emailBody){
        try{
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(emailBody, true);

            javaMailSender.send(message);
        } catch (Exception e) {
            throw new MailSenderException("Unable to send mail.");
        }
    }
}
