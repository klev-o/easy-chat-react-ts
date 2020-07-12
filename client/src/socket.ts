import io from 'socket.io-client';
const ENDPOINT: string = 'https://easy-chat-react-ts.herokuapp.com/'

const socket = io(ENDPOINT);

export default socket;