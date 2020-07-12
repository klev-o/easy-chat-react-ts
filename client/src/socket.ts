import io from 'socket.io-client';
const ENDPOINT: string = 'http://react-chat-ts.herokuapp.com/'

const socket = io(ENDPOINT);

export default socket;