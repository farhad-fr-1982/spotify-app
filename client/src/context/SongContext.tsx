import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

const server = "http://localhost:8000";

export interface Song {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    audio: string;
    album: string;
}

export interface Album {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
}

interface SongContextType {
    songs: Song[];
    song: Song | null;
    setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
    loading: boolean;
    selectedSong: string | null;
    setSelectedSong: React.Dispatch<React.SetStateAction<string | null>>;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    albums: Album[],
    fetchSingleSong: () => Promise<void>;
    nextSong: () => void;
    prevSong: () => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

interface SongProviderProps {
    children: ReactNode;
}

export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedSong, setSelectedSong] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [albums, setAlbums] = useState<Album[]>([])

    const fetchSongs = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get<Song[]>(`${server}/api/v1/song/all`);
            setSongs(data);
            if (data.length > 0) setSelectedSong(data[0]!.id.toString());
            setIsPlaying(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const [song, setSong] = useState<Song | null>(null);

    const fetchSingleSong = useCallback(async () => {

        if (!selectedSong) return;

        try {
            const { data } = await axios.get<Song>(`${server}/api/v1/song/${selectedSong}`);

            setSong(data);

        } catch (error) {

            console.log(error);
        }
    }, [selectedSong]);

    const fetchAlbums = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await axios.get<Album[]>(`${server}/api/v1/album/all`)
            setAlbums(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [])

    const [index, setIndex] = useState<number>(0);

    const nextSong = useCallback(() => {

        if (index === songs.length - 1) {

            setIndex(0);

            setSelectedSong(songs[0]?.id.toString());

        } else {

            setIndex((prevIndex) => prevIndex + 1);

            setSelectedSong(songs[index + 1]?.id.toString());
        }

    }, [index, songs]);

    const prevSong = useCallback(() => {

        if (index > 0) {
            setIndex((prev) => prev - 1);

            setSelectedSong(songs[index - 1]?.id.toString());
        }

    }, [index, songs]);

    useEffect(() => {
        fetchSongs();
        fetchAlbums()
    }, [fetchSongs, fetchAlbums]);

    return (
        <SongContext.Provider
            value={{
                songs,
                setSongs,
                loading,
                selectedSong,
                setSelectedSong,
                isPlaying,
                setIsPlaying,
                albums,
                song,
                nextSong,
                prevSong,
                fetchSingleSong
            }}
        >
            {children}
        </SongContext.Provider>
    );
};

export const useSongData = (): SongContextType => {
    const context = useContext(SongContext);

    if (!context) {
        throw new Error("useSongData باید داخل SongProvider استفاده بشه");
    }
    return context;
};