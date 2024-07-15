const SocketEvent = Object.freeze({
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
    UPDATE_CODE: "update-code",
    SYNC_CODE: "sync-code",
    SEND_MESSAGE: "send-message",
    RECEIVE_MESSAGE: "receive-message",
});

export default SocketEvent;
