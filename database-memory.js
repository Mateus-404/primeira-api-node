import {randomUUID} from "crypto"

export class DatabaseMemory{
    #videos = new Map()

    list(search) {
    return Array.from(this.#videos.entries())
        .map(([id, data]) => {
            return {
                id,
                ...data,
            }
        })
        .filter(video => {
            if (search) {
                return video.title.includes(search)
            }
            return true
        })
    }

    create (video){
        const videoID = randomUUID()

        this.#videos.set(videoID, video)
    }

    update (id, video){
        this.#videos.set(id, video)
    }

    delete (id){
        this.#videos.delete(id)
    }
}