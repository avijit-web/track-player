export const musicdata = [
    {
        title:"song 1",
        singer:"abc",
        image:require("./images/pic1.jpg"),
        song:require("./music/song1.mp3")
    },
    {
        title:"song 2",
        singer:"def",
        image:require("./images/pic2.jpg"),
        song:require("./music/song2.mp3")
    },
    {
        title:"song 3",
        singer:"ghi",
        image:require("./images/pic3.jpg"),
        song:require("./music/song3.mp3")

    },
    {
        title:"song 4",
        singer:"jkl",
        image:require("./images/pic4.jpg"),
        song:require("./music/song4.mp3")

    },
    {
        title:"song 5",
        singer:"mno",
        image:require("./images/pic5.jpg"),
        song:require("./music/song5.mp3")

    }
]

export const listdatamusic = musicdata.map((val,i)=>{
    return {
        title:val.title,
        artist:val.singer,
        artwork:val.image,
        url:val.song
    }
})