import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useSongData } from "../context/SongContext";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay, FaVolumeUp } from "react-icons/fa";

const Player = () => {
    const { song, fetchSingleSong, selectedSong, isPlaying, setIsPlaying, prevSong, nextSong } = useSongData();

    const audioRef = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState<number>(1);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    // گرفتن آهنگ
    useEffect(() => {
        fetchSingleSong();
    }, [fetchSingleSong]);

    // کنترل پخش/توقف
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch((error) => console.error(error));
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    // event listenerها
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetaData = () => setDuration(audio.duration || 0);
        const handleTimeUpdate = () => setProgress(audio.currentTime || 0);

        audio.addEventListener("loadedmetadata", handleLoadedMetaData);
        audio.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [song]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const volumeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const durationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTime = (parseFloat(e.target.value) / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
        setProgress(newTime);
    };

    return (
        <div>
            {song && (
                <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
                    {/* اطلاعات آهنگ */}
                    <div className="lg:flex items-center gap-4">
                        <img src={song.thumbnail || "/download.jpeg"} alt={song.title} className="w-12 h-12 rounded" />
                        <div className="hidden md:block">
                            <p>{song.title}</p>
                            <p>{song.description?.slice(0, 30)}...</p>
                        </div>
                    </div>

                    {/* کنترل‌ها */}
                    <div className="flex flex-col items-center gap-1 m-auto">
                        {song.audio && (
                            <audio ref={audioRef} src={song.audio} />
                        )}

                        {/* نوار پیشرفت */}
                        <div className="w-full items-center flex font-thin text-green-400">
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={duration ? (progress / duration) * 100 : 0}
                                onChange={durationChange}
                                className="progress-bar w-[120px] md:w-[300px]"
                            />
                        </div>

                        {/* دکمه‌ها */}
                        <div className="flex justify-center items-center gap-4">
                            <span className="cursor-pointer" onClick={prevSong}>
                                <GrChapterNext />
                            </span>

                            <button
                                className="bg-white text-black rounded-full p-2"
                                onClick={handlePlayPause}
                            >
                                {isPlaying ? <FaPause /> : <FaPlay />}
                            </button>

                            <span className="cursor-pointer" onClick={nextSong}>
                                <GrChapterPrevious />
                            </span>
                        </div>
                    </div>

                    {/* صدا */}
                    <div className="flex items-center gap-2">
                        <span><FaVolumeUp/></span>
                        <input type="range" className="w-16 md:w-32" min={0} max={1} step={0.01} value={volume} onChange={volumeChange} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Player;