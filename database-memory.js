import {randomUUID} from "crypto"

export class DatabaseMemory{
    #videos = new Map()

    async list(search) {
    const videos = Array.from(this.#videos.entries())
        .map(([id, data]) => {
            return {
                id,
                ...data,
            }
        })
        .filter(video => {
            if (search) {
                return video.title.toLowerCase().includes(search.toLowerCase())
            }
            return true
        })
    return videos
    }

    async create (video){
        const videoID = randomUUID()

        this.#videos.set(videoID, video)
    }

    async update (id, video){
        this.#videos.set(id, video)
    }

    async delete (id){
        this.#videos.delete(id)
    }
}