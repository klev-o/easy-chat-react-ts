import io from 'socket.io-client';
const ENDPOINT: string = 'https://react-chat-ts.herokuapp.com/'

const socket = io(ENDPOINT);

export default socket;