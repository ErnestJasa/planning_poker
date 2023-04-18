using PlanningPokerAPI.Interfaces;
using System.Net.Mail;
using System.Net;

namespace PlanningPokerAPI.Repository
{
    public class EmailSenderRepository : IEmailSenderRepository
    {
        string mail = "temp.mail.for.school123456@gmail.com";
        string passwword = "AEEDE73E99BD76C536539C132B69A17FDB3D";



        public Task SendEmail(string email, string link)
        {
            string subject = "Voting poker link";
            string message = $"Dear Moderator, \n" +
                             $"You have created new voting room, its unique link is: {link} \n" +
                             $"Please use it to access this room. This link can be shared with other players to access the same room.";
            var client = new SmtpClient("smtp.elasticemail.com", 2525)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(mail, passwword)
            };

            return client.SendMailAsync(
                new MailMessage(
                    from: mail,
                    to: email,
                    subject,
                    message
                ));
        }
    }
}
