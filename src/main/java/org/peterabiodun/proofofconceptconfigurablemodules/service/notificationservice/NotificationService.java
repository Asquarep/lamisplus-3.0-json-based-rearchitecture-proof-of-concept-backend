package org.peterabiodun.proofofconceptconfigurablemodules.service.notificationservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class NotificationService {

//    @Autowired
//    private TicketRequestRepository ticketRequestRepository;
//
//    @Autowired
//    private EmailService emailService;
//
//    @Value("${app.notification.event-reminder-weeks}")
//    private Integer eventReminderWeeks;
//
//    @Scheduled(cron = "${app.event-reminder.cron}") // Scheduled event reminders
//    public void sendReminderEmailsForUpcomingEvents() {
//        log.info("Sending reminder emails for upcoming events");
//        LocalDate now = LocalDate.now();
//        LocalDate weeksFromNowDate = now.plusWeeks(eventReminderWeeks);
//
//        List<TicketRequest> upcomingBookedTickets = ticketRequestRepository
//                .findByStatusAndEventDateBetween(TicketRequestStatus.BOOKED.toString(), now, weeksFromNowDate);
//        if (upcomingBookedTickets.isEmpty()) {
//            log.info("No upcoming event tickets found");
//            return;
//        }
//
//        for (TicketRequest ticketRequest : upcomingBookedTickets) {
//            sendReminderEmail(ticketRequest);
//        }
//    }
//
//    private void sendReminderEmail(TicketRequest ticketRequest) {
//        log.info("Sending reminder to user ${} for event ${}",
//                ticketRequest.getBookedBy().getName(), ticketRequest.getEvent().getName());
//
//        String userEmail = ticketRequest.getBookedBy().getEmail();
//        String subject = "Reminder: " + ticketRequest.getEvent().getName();
//
//        // Set email variables
//        Map<String, Object> emailVariables = new HashMap<>();
//        emailVariables.put("userName", ticketRequest.getBookedBy().getName());
//        emailVariables.put("eventName", ticketRequest.getEvent().getName());
//        emailVariables.put("eventDate", ticketRequest.getEvent().getDate().toString());
//
//        // Convert the template
//        String emailBodyTemplate = ApplicationConstants.EMAIL_TEMPLATE;
//        String emailBody = EmailTemplateConverter.convertTemplate(emailBodyTemplate, emailVariables);
//
//        // Send the email using the converted template
//        emailService.sendEmail(userEmail, subject, emailBody);
//    }
}
