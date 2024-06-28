package services

import (
	"bytes"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"html/template"
	"net/smtp"
	"os"
	"path/filepath"
)

func GenerateToken() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b), nil
}

func SendVerificationEmail(name, email, token string) error {
	provider := os.Getenv("SMTP_USERNAME")
	pass := os.Getenv("SMTP_PASSWORD")
	baseURL := os.Getenv("WEB_URL")

	if provider == "" || pass == "" || baseURL == "" {
		return fmt.Errorf("SMTP credentials or BASE_URL not set")
	}

	from := provider
	password := pass
	to := email
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	verificationURL := fmt.Sprintf("%s/verify/%s", baseURL, token)
	templatePath := filepath.Join("src", "templates", "email_template.html")

	tmpl, err := template.ParseFiles(templatePath)
	if err != nil {
		return fmt.Errorf("failed to parse email template: %v", err)
	}

	data := struct {
		Name            string
		VerificationURL string
	}{
		Name:            name,
		VerificationURL: verificationURL,
	}

	var body string
	buf := new(bytes.Buffer)
	if err := tmpl.Execute(buf, data); err != nil {
		return fmt.Errorf("failed to execute email template: %v", err)
	}
	body = buf.String()

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: Verify your account\n" +
		"MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n" +
		body

	auth := smtp.PlainAuth("", from, password, smtpHost)

	err = smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, []byte(msg))
	if err != nil {
		return fmt.Errorf("failed to send email: %v", err)
	}

	return nil
}
