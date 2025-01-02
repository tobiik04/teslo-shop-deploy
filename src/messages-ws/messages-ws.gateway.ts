import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io'
import { NewMessageDto } from './dtos/new-message.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from 'src/auth/interfaces'

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() wsServer: Server;
  constructor(
    private readonly messagesWsService: MessagesWsService,
    
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;


    try {
      payload = this.jwtService.verify(token)
      await this.messagesWsService.registerClient(client, payload.id)
    
    } catch (error) {
      client.disconnect()
      return;
      
    }

    console.log('mi payload: ', payload)
    
    this.wsServer.emit('clients-updated', this.messagesWsService.getConnectedClientes())
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id)
    this.wsServer.emit('clients-updated', this.messagesWsService.getConnectedClientes())
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    
    //solo el que lo emite
    client.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'no message!!'
    })


    //todos menos el que lo emite
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'soy yo!',
    //   message: payload.message || 'no message!!'
    // })



    //   //todos
    // this.wsServer.emit('message-from-server', {
    //   fullName: 'soy yo!',
    //   message: payload.message || 'no message!!'
    // })
    
  }



}
