import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Video, Phone, Mic, MicOff, VideoOff, Users, ExternalLink } from 'lucide-react';

const VideoConsultation = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [meetingLink, setMeetingLink] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (roomId) {
      generateMeetingLink();
    }
  }, [roomId]);

  const generateMeetingLink = () => {
    // Generate Google Meet link
    const meetId = roomId.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
    const googleMeetLink = `https://meet.google.com/${meetId}`;
    
    setMeetingLink(googleMeetLink);
    setIsLoading(false);
  };

  const joinMeeting = () => {
    window.open(meetingLink, '_blank');
  };

  const joinZoom = () => {
    const zoomLink = `https://zoom.us/j/${roomId.replace(/[^0-9]/g, '').substring(0, 11)}`;
    window.open(zoomLink, '_blank');
  };

  const endCall = () => {
    navigate('/appointments');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Video className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Video Consultation</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">Room: {roomId}</span>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>

      {/* Meeting Options */}
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-700 text-lg">Preparing video consultation...</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Video className="h-8 w-8 text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Video Consultation</h2>
              <p className="text-gray-600 mb-8">Choose your preferred platform to join the meeting</p>
              
              <div className="space-y-4">
                <button
                  onClick={joinMeeting}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>Join with Google Meet</span>
                </button>
                
                <button
                  onClick={joinZoom}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>Join with Zoom</span>
                </button>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Meeting Details:</p>
                  <p className="text-xs text-gray-500">Room ID: {roomId}</p>
                  <p className="text-xs text-gray-500 mt-1">Google Meet: {meetingLink}</p>
                </div>
                
                <button
                  onClick={endCall}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors mt-4"
                >
                  Back to Appointments
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoConsultation;