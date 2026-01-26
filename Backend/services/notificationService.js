// import { Notification } from "../models/Notification.js";
// import {
//   sendApplicationStatusEmail,
//   sendInterviewScheduledEmail,
// } from "./emailService.js";
// import { NOTIFICATION_TYPES } from "../config/constants.js";

// /**
//  * Create a notification and optionally send an email.
//  * 
//  * @param {Object} params
//  * @param {string} params.senderId - ID of the sender
//  * @param {Object} params.recipient - Recipient user object
//  * @param {string} params.type - Notification type (from NOTIFICATION_TYPES)
//  * @param {string} params.content - Message content
//  * @param {Object|null} params.application - Related application, if any
//  * @param {Object|null} params.interview - Related interview, if any
//  */
// export const createNotification = async ({
//   senderId,
//   recipient,
//   type,
//   content,
//   application = null,
//   interview = null,
// }) => {
//   // Save notification in DB
//   const notification = await Notification.create({
//     sender_id: senderId,
//     recipient_id: recipient.id,
//     related_application_id: application?.id || null,
//     message_type: type,
//     content,
//     is_sent: true,
//   });

//   // Send email based on notification type
//   switch (type) {
//     case NOTIFICATION_TYPES.APPLICATION_STATUS_CHANGED:
//       if (application) {
//         await sendApplicationStatusEmail(recipient, application, application.status);
//       }
//       break;

//     case NOTIFICATION_TYPES.INTERVIEW_SCHEDULED:
//       if (interview) {
//         await sendInterviewScheduledEmail(recipient, interview);
//       }
//       break;

//     default:
//       // No email needed
//       break;
//   }

//   return notification;
// };
// import { Notification } from "../models/Notification.js";
// import { sendApplicationStatusEmail } from "./emailService.js";
// import { NOTIFICATION_TYPES } from "../config/constants.js";

// /**
//  * Create a notification and send email to user
//  */
// export const createNotification = async ({
//   senderId,
//   recipient,
//   type,
//   content,
//   application = null,
// }) => {
//   if (!recipient || !recipient.id) {
//     console.error("Notification recipient is invalid!", recipient);
//     return null;
//   }

//   try {
//     // 1️⃣ Save notification in DB
//     const notification = await Notification.create({
//       sender_id: senderId,
//       recipient_id: recipient.id,
//       related_application_id: application?.id || null,
//       message_type: type,
//       content,
//       is_sent: true,
//     });

//     console.log(`Notification saved for user ${recipient.id}`);

//     // 2️⃣ Send email if needed
//     if (type === NOTIFICATION_TYPES.APPLICATION_STATUS_CHANGED && application) {
//       try {
//         await sendApplicationStatusEmail(recipient, application, application.status);
//         console.log(`Email sent to ${recipient.email}`);
//       } catch (emailError) {
//         console.error("Failed to send application status email:", emailError);
//       }
//     }

//     return notification;
//   } catch (dbError) {
//     console.error("Failed to create notification:", dbError);
//     return null;
//   }
// };
import { Notification } from "../models/Notification.js";
import { sendApplicationStatusEmail } from "./emailService.js";
import { NOTIFICATION_TYPES } from "../config/constants.js";

/**
 * Create a notification and send email to user
 */
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
    // 
    const notification = await Notification.create({
      sender_id: senderId,
      recipient_id: recipient.id,
      related_application_id: application?.id || null,
      message_type: type,
      content,
      is_sent: true,
    });

    console.log(`Notification saved for user ${recipient.id}`);

    // 2️⃣ Send email if needed
    if (type === NOTIFICATION_TYPES.APPLICATION_STATUS_CHANGED && application) {
      try {
        await sendApplicationStatusEmail(recipient, application, application.status);
        console.log(`Email sent to ${recipient.email}`);
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
