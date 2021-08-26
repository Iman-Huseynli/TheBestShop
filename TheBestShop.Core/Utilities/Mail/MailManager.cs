using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace NigroCandle.Core.Utilities.Mail
{
    public class MailManager : IMailService
    {
        private readonly IConfiguration _configuration;
        public MailManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void Send(EmailMessage emailMessage)
        {
            var message = new MimeMessage();
            //message.To.AddRange(emailMessage.ToAddresses.Select(x => new MailboxAddress(x.Name, x.Address)));
            string fromName = _configuration.GetSection("EmailConfiguration").GetSection("SenderName").Value;
            string fromAddress = _configuration.GetSection("EmailConfiguration").GetSection("SenderEmail").Value;
            string password = _configuration.GetSection("EmailConfiguration").GetSection("Password").Value;
            message.To.AddRange(emailMessage.ToAddresses.Select(x => new MailboxAddress(x.Name, fromAddress)));
            message.From.Add(new MailboxAddress(fromName, fromAddress));

            message.Subject = emailMessage.Subject;

            BodyBuilder emailBodyBuilder = new BodyBuilder();
            emailBodyBuilder.HtmlBody = emailMessage.Content;
            message.Body = emailBodyBuilder.ToMessageBody();
            using (var emailClient = new SmtpClient())
            {
                emailClient.Connect(_configuration.GetSection("EmailConfiguration").GetSection("SmtpServer").Value,
                    Convert.ToInt32(_configuration.GetSection("EmailConfiguration").GetSection("SmtpPort").Value),
                    MailKit.Security.SecureSocketOptions.Auto);
                emailClient.Authenticate(fromAddress, password);
                emailClient.Send(message);
                emailClient.Disconnect(true);
            }
        }
    }
}
