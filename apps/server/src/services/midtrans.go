package services

import (
	"os"

	"github.com/veritrans/go-midtrans"
)

var MidtransClient midtrans.Client

func InitMidtrans() {
	SERVER_KEY := os.Getenv("SERVER_KEY")
	CLIENT_KEY := os.Getenv("CLIENT_KEY")
	MidtransClient = midtrans.Client{
		ServerKey: SERVER_KEY,
		ClientKey: CLIENT_KEY,
	}
	MidtransClient.APIEnvType = midtrans.Sandbox
}
