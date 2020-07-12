import io from 'socket.io-client';
const ENDPOINT: string = 'localhost:9999'

const socket = io(ENDPOINT);

export default socket;