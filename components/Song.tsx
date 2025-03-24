import { convertDuration } from "@/utils/durationConverter"
import Image from "next/image"

interface Progs {
    item: SpotifyApi.PlaylistTrackObject;
    itemIndex: number;
    addedAt: string;
    isCompact: boolean;
}

const Song = ({ item: { track }, itemIndex, addedAt, isCompact }: Progs) => {
    return (
        <div className="grid grid-cols-2 text-gray-500 px-5 py-4 hover:bg-gray-900 rounded-lg cursor-pointer">
            <div className="flex items-center space-x-4">
                <p>{itemIndex + 1}</p>

                {!isCompact && (
                    <>
                        <div>
                            <Image src={track?.album.images[0].url || ""} alt="track cover" height={40} width={40} />
                        </div>
                        <div>
                            <p className="w-36 lg:w-72 truncate text-white">{track?.name}</p>
                            <p className="w-40">{track?.artists[0].name}</p> {/* Nghệ sĩ hiển thị dưới */}
                        </div>
                    </>
                )}
                {isCompact && (
                    <p className="w-36 lg:w-72 truncate text-white">{track?.name}</p>
                )}
            </div>

            <div className="flex justify-between items-center ml-auto md:ml-0">
                {isCompact && <p className="w-40">{track?.artists[0].name}</p>} {/* Cột nghệ sĩ khi rút gọn */}
                <p className="w-40">{track?.album.name}</p>
                <p>{new Date(addedAt).toLocaleDateString("vi-VN")}</p>
                <p>{convertDuration(track?.duration_ms as number)}</p>
            </div>
        </div>
    );
};

export default Song;
