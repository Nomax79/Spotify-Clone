import { usePlaylistContext } from "@/contexts/PlaylistContexts"
import Song from "./Song"
import { AiOutlineClockCircle } from "react-icons/ai"
import { useState } from "react"

const Songs = () => {
    const { playlistContextState: { selectedPlaylist } } = usePlaylistContext();
    const [isCompact, setIsCompact] = useState(false);

    if (!selectedPlaylist) return null;
    
    return (
        <div className="flex flex-col space-y-1 px-8 pb-28">
            {/* Nút Rút gọn / Mở rộng */}
            <div className="flex justify-end px-5 pb-3">
                <button 
                    className="text-xs px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                    onClick={() => setIsCompact(!isCompact)}
                >
                    {isCompact ? "Mở rộng" : "Rút gọn"}
                </button>
            </div>

            {/* Header bảng */}
            <div className="grid grid-cols-2 text-gray-400 px-5 pb-3 border-b border-gray-700 text-sm">
                <div className="flex items-center space-x-4">
                    <p>#</p>
                    <p>Tiêu đề</p>
                </div>
                <div className="flex justify-between items-center ml-auto md:ml-0">
                    {isCompact && <p className="w-40">Nghệ sĩ</p>} 
                    <p className="w-40">Album</p>
                    <p>Ngày thêm</p>
                    <AiOutlineClockCircle className="w-4 h-4" />
                </div>
            </div>

            {/* Danh sách bài hát */}
            {
                selectedPlaylist.tracks.items.map((item, index) => (
                    <Song 
                        key={item.track?.id} 
                        item={item} 
                        itemIndex={index} 
                        addedAt={item.added_at} 
                        isCompact={isCompact}  
                    />
                ))
            }
        </div>
    );
};

export default Songs;
