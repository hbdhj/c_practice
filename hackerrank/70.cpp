/*

Copyright 2017 <Deng Haijun>

Dashboard > Distributed Systems > Client Server > UDS Echo Server 

Example request 1:

Client 1:
Hello World
END

Example response 1:

Client 1:
Hello World

Example request 2:

Client 2:
This is line 1
This is line 2
END

Example response 2:

Client 2:
This is line 1
This is line 2

*/

void * process_client_connection(void * ptr)
{
    connection_t * conn;

    if (!ptr) pthread_exit(0); 
    conn = (connection_t *)ptr;

    printf("Connection received\n");

    int terminate_client = 0;
    do
    {
        /* read length of message */
        char *message = NULL;
        uint32_t message_length = 0;

        /* read message */
        read_string_from_socket(conn->sock, &message, &message_length);
        
        printf("Received = %s\n", message);
        
         /* Your logic goes here */
        write_string_to_socket(conn->sock, message, message_length);
        
        /* End of operation on this clinet */
        if (strcmp(message, "END") == 0)
            terminate_client = 1;
        
        free(message);

    } while(!terminate_client);

    /* close socket and clean up */
    printf("Closing client on socket %d\n", conn->sock);
    close(conn->sock);
    free(conn);
    pthread_exit(0);
}

int main() {
    return 0;
}