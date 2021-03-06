
// socket server key words socket bind listen accept send recv close
#include <stdio.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <netinet/in.h>
#include <signal.h>

#define MAXPENDING 5    /* Max connection requests */
#define BUFFSIZE 32

void Die(const char *mess) { perror(mess); exit(1); }

void HandleClient(int sock) {
    char buffer[BUFFSIZE];
    int received = -1;

    /* Receive message */
    if ((received = recv(sock, buffer, BUFFSIZE, 0)) < 0) {
        Die("Failed to receive initial bytes from client");
    }

    /* Send bytes and check for more incoming data in loop */
    while (received > 0) {
        fprintf(stdout, "Receive %s from socket: %d\n", buffer, sock);
        /* Send back received data */
        if (send(sock, buffer, received, 0) != received) {
            Die("Failed to send bytes to client");
        }

        // reset the buffer
        memset(buffer, '\0', sizeof(buffer));

        /* Check for more data */
        if ((received = recv(sock, buffer, BUFFSIZE, 0)) < 0) {
            Die("Failed to receive additional bytes from client");
        }
    }
    close(sock);
}

void  SIGINT_handler(int sig)
{
    signal(sig, SIG_IGN);
    printf("From SIGINT: just got a %d (SIGINT ^C) signal\n", sig);
    signal(sig, SIGINT_handler);
}

int main(int argc, char *argv[]) {
    int serversock, clientsock;
    struct sockaddr_in echoserver, echoclient;

    if (argc != 2) {
        fprintf(stderr, "USAGE: echoserver <port>\n");
        exit(1);
    }

    if (signal(SIGINT, SIGINT_handler) == SIG_ERR) {
        fprintf(stderr, "SIGINT install error\n");
        _exit(1);
    }

    /* Create the TCP socket */
    if ((serversock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP)) < 0) {
        Die("Failed to create socket");
    }

    /* Construct the server sockaddr_in structure */
    memset(&echoserver, 0, sizeof(echoserver));       /* Clear struct */
    echoserver.sin_family = AF_INET;                  /* Internet/IP */
    echoserver.sin_addr.s_addr = htonl(INADDR_ANY);   /* Incoming addr */
    echoserver.sin_port = htons(atoi(argv[1]));       /* server port */

    /* Bind the server socket */
    if (bind(serversock, (struct sockaddr *) &echoserver,
                             sizeof(echoserver)) < 0) {
        Die("Failed to bind the server socket");
    }

    /* Listen on the server socket */
    if (listen(serversock, MAXPENDING) < 0) {
        Die("Failed to listen on server socket");
    }

    /* Run until cancelled */
    while (1) {
        unsigned int clientlen = sizeof(echoclient);
        /* Wait for client connection */
        if ((clientsock =
        accept(serversock, (struct sockaddr *) &echoclient,
              &clientlen)) < 0) {
            Die("Failed to accept client connection");
        }
        fprintf(stdout, "Client connected: %s\n", inet_ntoa(echoclient.sin_addr));
        HandleClient(clientsock);
    }
}
