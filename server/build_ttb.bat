set GOPATH=%cd%
del bin\*.exe

go install it/bob/apps/web/ttb-server
