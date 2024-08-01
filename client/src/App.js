import React from 'react';
import MessageList from './components/MessageList';
import VideoBackground from './components/VideoBackground';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <div className="App">
            <VideoBackground />
            <div className="container mt-5">
                <MessageList />
            </div>
        </div>
    );
};

export default App;
