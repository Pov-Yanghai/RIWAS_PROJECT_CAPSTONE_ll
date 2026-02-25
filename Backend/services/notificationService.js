import { Notification } from "../models/Notification.js";
import { sendApplicationStatusEmail, sendApplicationReceivedEmail } from "./emailService.js";
import { NOTIFICATION_TYPES } from "../config/constants.js";

// Create a notification and send email to user
export const createNotification = async ({
  senderId,
  recipient,
  type,
  content,
  application = null,
}) => {
  if (!recipient || !recipient.id) {
    console.error("Notification recipient is invalid!", recipient);
    return null;
  }

  try {
    // Save notification in DB
    const notification = await Notification.create({
      sender_id: senderId,
      recipient_id: recipient.id,
      related_application_id: application?.id || null,
      message_type: type,
      content,
      is_sent: true,
    });

    console.log(`Notification saved for user ${recipient.id}`);
    //Updated 
    
    // Send confirmation email when candidate first applies
    if (type === NOTIFICATION_TYPES.APPLICATION_RECEIVED && application) {
      try {
        if (!recipient.email) {
          console.warn("Skipping email: recipient has no email", recipient);
        } else {
          await sendApplicationReceivedEmail({
            applicant: {
              email:    recipient.email,
              fullName: recipient.fullName || recipient.firstName || "Candidate",
            },
            positionTitle: application.job?.title,
            companyName:   application.job?.company?.name || "RIWAS",
          });
          console.log(`Application received email sent to ${recipient.email}`);
        }
      } catch (emailError) {
        console.error("Failed to send application received email:", emailError);
      }
    }

    // Send email if this type requires it
    if (type === NOTIFICATION_TYPES.APPLICATION_STATUS_CHANGED && application) {
      try {
        // Safety checks to avoid errors
        if (!recipient.email) {
          console.warn("Skipping email: recipient has no email", recipient);
        } else if (!application.job?.title) {
          console.warn("Skipping email: application missing job info", application);
        } else {
          await sendApplicationStatusEmail(recipient, application, application.status);
          console.log(`Email sent to ${recipient.email}`);
        }
      } catch (emailError) {
        console.error("Failed to send application status email:", emailError);
      }
    }

    return notification;
  } catch (dbError) {
    console.error("Failed to create notification:", dbError);
    return null;
  }
};
