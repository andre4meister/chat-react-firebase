import {Server, Socket} from "socket.io";
import {randomUUID} from "crypto";

export interface MessageType {
    roomId: string
    username: string
    message: string
}

const EVENTS = {
    connection: 'connection',
    CLIENT: {
        CREATE_ROOM: 'CREATE_ROOM',
        SEND_ROOM_MESSAGE: 'SEND_ROOM_MESSAGE',
        JOIN_ROOM: 'JOIN_ROOM',
    },
    SERVER: {
        ROOMS: 'ROOMS',
        JOINED_ROOMS: 'JOINED_ROOMS',
        ROOM_MESSAGE: 'ROOM_MESSAGE',
    }
}

const rooms = [] as any;

function socketMap({io}: { io: Server }) {
    io.on(EVENTS.connection, (socket: Socket) => {
        console.log(`User connected ${socket.id}`);

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({roomName}: { roomName: string }) => {
            const roomId = randomUUID();
            rooms.push({roomId, roomName})

            socket.join(roomId)
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms)
            socket.emit(EVENTS.SERVER.ROOMS, rooms)
            socket.emit(EVENTS.SERVER.JOINED_ROOMS, roomId)
        });

        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({username, message, roomId}: MessageType) => {
            const date = new Date();
            socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                message,
                username,
                time: date.toLocaleTimeString()
            })
        });

        socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
            socket.join(roomId);
            socket.emit(EVENTS.SERVER.JOINED_ROOMS, roomId);
        })
    })


}

export default socketMap;