import React, { useState, useEffect } from "react"; import { Play, Pause, SkipForward, SkipBack, Heart, Plus } from "lucide-react";

const songsData = [ { title: "Shape of You", artist: "Ed Sheeran", url: "https://www.youtube.com/embed/JGwWNGJdvx8?autoplay=1" }, { title: "Blinding Lights", artist: "The Weeknd", url: "https://www.youtube.com/embed/4NRXx6U8ABQ?autoplay=1" }, { title: "Levitating", artist: "Dua Lipa", url: "https://www.youtube.com/embed/TUVcZfQe-Kw?autoplay=1" }, ];

export default function MusicWebsite() { const [user, setUser] = useState(localStorage.getItem("user")); const [username, setUsername] = useState(""); const [currentIndex, setCurrentIndex] = useState(null); const [isPlaying, setIsPlaying] = useState(false); const [liked, setLiked] = useState(JSON.parse(localStorage.getItem("liked")) || []); const [playlist, setPlaylist] = useState(JSON.parse(localStorage.getItem("playlist")) || []);

useEffect(() => { localStorage.setItem("liked", JSON.stringify(liked)); localStorage.setItem("playlist", JSON.stringify(playlist)); }, [liked, playlist]);

const login = () => { localStorage.setItem("user", username); setUser(username); };

const currentSong = songsData[currentIndex];

const playSong = (index) => { setCurrentIndex(index); setIsPlaying(true); };

const nextSong = () => { if (currentIndex !== null) { setCurrentIndex((currentIndex + 1) % songsData.length); } };

const prevSong = () => { if (currentIndex !== null) { setCurrentIndex((currentIndex - 1 + songsData.length) % songsData.length); } };

const toggleLike = (index) => { setLiked((prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index] ); };

const addToPlaylist = (song) => { setPlaylist([...playlist, song]); };

if (!user) { return ( <div className="min-h-screen flex items-center justify-center bg-black text-white"> <div className="bg-gray-900 p-6 rounded-xl"> <h2 className="text-xl mb-4">Login</h2> <input placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} className="p-2 rounded text-black" /> <button onClick={login} className="ml-2 bg-green-500 px-4 py-2 rounded"> Enter </button> </div> </div> ); }

return ( <div className="min-h-screen bg-black text-white flex"> {/* Sidebar */} <div className="w-60 bg-black p-5 hidden md:block"> <h1 className="text-2xl font-bold mb-6">Spotify Clone</h1> <p className="mb-3 text-gray-400">🏠 Home</p> <p className="mb-3 text-gray-400">❤️ Liked</p> <p className="mb-3 text-gray-400">📂 Playlist</p> </div>

{/* Main */}
  <div className="flex-1 p-6 pb-28">
    <h2 className="text-2xl font-bold mb-4">Welcome, {user} 👋</h2>

    {songsData.map((song, index) => (
      <div key={index} className="flex justify-between items-center p-3 mb-2 bg-gray-900 rounded-lg">
        <div>
          <p>{song.title}</p>
          <p className="text-sm text-gray-400">{song.artist}</p>
        </div>

        <div className="flex gap-3 items-center">
          <button onClick={() => toggleLike(index)}>
            <Heart className={liked.includes(index) ? "text-green-500" : ""} />
          </button>
          <button onClick={() => addToPlaylist(song)}>
            <Plus />
          </button>
          <button onClick={() => playSong(index)} className="bg-green-500 p-2 rounded-full">
            <Play size={16} />
          </button>
        </div>
      </div>
    ))}

    {/* Playlist Section */}
    <h3 className="mt-6 mb-2">Your Playlist</h3>
    {playlist.map((song, i) => (
      <p key={i} className="text-sm text-gray-300">• {song.title}</p>
    ))}

    {currentSong && (
      <iframe className="hidden" src={currentSong.url} allow="autoplay" title="player" />
    )}
  </div>

  {/* Bottom Player */}
  {currentSong && (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 p-4 flex justify-between items-center">
      <div>
        <p>{currentSong.title}</p>
        <p className="text-xs text-gray-400">{currentSong.artist}</p>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={prevSong}><SkipBack /></button>
        <button onClick={() => setIsPlaying(!isPlaying)} className="bg-white text-black p-3 rounded-full">
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button onClick={nextSong}><SkipForward /></button>
      </div>

      <div className="w-20"></div>
    </div>
  )}
</div>

); }
