package tys.tysWebserver.emailAlert.controller;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

import tys.tysWebserver.memberManager.model.MemberModel;
import tys.tysWebserver.scheduler.model.WatercraftScheduler;
import tys.tysWebserver.watercraftManager.model.WatercraftModel;

@Service
public class EmailSenderAmazonSES {

    // Replace smtp_username with your Amazon SES SMTP user name.
    static final String SMTP_USERNAME = "AKIAWRI35M7MB7TUGL5B";
    
    // Replace smtp_password with your Amazon SES SMTP password.
    static final String SMTP_PASSWORD = "BOW21JgynjE4kR/afYKE1Ka3FP1/JIRDf/W6I0WOwEuN";
    
    // The name of the Configuration Set to use for this message.
    // If you comment out or remove this variable, you will also need to
    // comment out or remove the header below.
//    static final String CONFIGSET = "ConfigSet";
    
    // Amazon SES SMTP host name. This example uses the US West (Oregon) region.
    // See https://docs.aws.amazon.com/ses/latest/DeveloperGuide/regions.html#region-endpoints
    // for more information.
    static final String HOST = "email-smtp.us-east-2.amazonaws.com";
    
    // The port you will connect to on the Amazon SES SMTP endpoint. 
    static final int PORT = 587;

    public String createEmailForBooking(MemberModel model, WatercraftScheduler newSchedule, WatercraftModel watercraftModel) {
    	String bodyOfEmail = "Hi "+model.getFirstname()+"\n A reservation has been created for Yacht "
				+ watercraftModel.getWatercraftName() + " on " + newSchedule.getReservation().get(0).getForDate().toString()
				+ " from " + newSchedule.getReservation().get(0).getStartHour() + " to "
				+ newSchedule.getReservation().get(0).getEndHour();
    	return bodyOfEmail;
    }
    
    public String createEmailAdmin(MemberModel model, WatercraftScheduler newSchedule, WatercraftModel watercraftModel) {
    	
    	String adminEmail = "Crew service requested for booking id " + newSchedule.getScheduleId() + " on "
    			+ newSchedule.getReservation().get(0).getForDate().toString()
				+ " from " + newSchedule.getReservation().get(0).getStartHour() + " to "
				+ newSchedule.getReservation().get(0).getEndHour();

    	return adminEmail;
    }
    public void createEmail(String from, String fromName, String to, String subject, String body) throws Exception {
    	// Replace sender@example.com with your "From" address.
        // This address must be verified.
        String FROM = from;
        String FROMNAME = fromName;
    	
        // Replace recipient@example.com with a "To" address. If your account 
        // is still in the sandbox, this address must be verified.
        String TO = to;
        
        String SUBJECT = subject;
        
        String BODY = String.join(System.getProperty("line.separator"),body);
//        "<h1>Amazon SES SMTP Email Test</h1>"
//        "<p>This email was sent with Amazon SES using the ", 
//	    "<a href='https://github.com/javaee/javamail'>Javamail Package</a>",
//	    " for <a href='https://www.java.com'>Java</a>."
        sendEmail(FROM, FROMNAME, TO, SUBJECT, BODY);
    }
    private void sendEmail(String FROM, String FROMNAME, String TO, String SUBJECT, String BODY) throws Exception {
    	// Create a Properties object to contain connection configuration information.
    	Properties props = System.getProperties();
    	props.put("mail.transport.protocol", "smtp");
    	props.put("mail.smtp.port", PORT); 
    	props.put("mail.smtp.starttls.enable", "true");
    	props.put("mail.smtp.auth", "true");

        // Create a Session object to represent a mail session with the specified properties. 
    	Session session = Session.getDefaultInstance(props);

        // Create a message with the specified information. 
        MimeMessage msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress(FROM,FROMNAME));
        msg.setRecipient(Message.RecipientType.TO, new InternetAddress(TO));
        msg.setSubject(SUBJECT);
        msg.setContent(BODY,"text/html");
        
        // Add a configuration set header. Comment or delete the 
        // next line if you are not using a configuration set
//        msg.setHeader("X-SES-CONFIGURATION-SET", CONFIGSET);
            
        // Create a transport.
        Transport transport = session.getTransport();
                    
        // Send the message.
        try
        {
            System.out.println("Sending...");
            
            // Connect to Amazon SES using the SMTP username and password you specified above.
            transport.connect(HOST, SMTP_USERNAME, SMTP_PASSWORD);
        	
            // Send the email.
            transport.sendMessage(msg, msg.getAllRecipients());
            System.out.println("Email sent!");
        }
        catch (Exception ex) {
            System.out.println("The email was not sent.");
            System.out.println("Error message: " + ex.getMessage());
        }
        finally
        {
            // Close and terminate the connection.
            transport.close();
        }
    }
}
