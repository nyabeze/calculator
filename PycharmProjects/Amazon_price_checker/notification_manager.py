import smtplib
from email.mime.text import MIMEText


class NotificationManager:
    def __init__(self, price):

        # Configuration
        self.port = 587  # For starttls
        self.smtp_server = "smtp.gmail.com"
        self.sender_email = "nyabeze02@gmail.com"  # Replace with your Gmail address
        self.receiver_email = "ryanfirstclass2024@gmail.com"  # Replace with the receiver's email address
        self.password = "szdqbvtcqvoeapkp"  # Replace with your Gmail account password or app password

        # Plain text content
        self.text = f"""\
        Hi,
        
        The SAMSUNG S24 Ultra is priced at ${price}.You can Buy it now!
        """

    def send_mail(self):
        # Create MIMEText object
        message = MIMEText(self.text, "plain")
        message["Subject"] = "Amazon Price Checker Notification"
        message["From"] = self.sender_email
        message["To"] = self.receiver_email

        # Send the email
        try:
            with smtplib.SMTP(self.smtp_server, self.port) as server:
                server.starttls()  # Secure the connection
                server.login(self.sender_email, self.password)
                server.sendmail(self.sender_email, self.receiver_email, message.as_string())
            print('Email sent successfully!')
        except Exception as e:
            print(f'Failed to send email: {e}')


