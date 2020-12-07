function Song(id, name, image, url){
    this.id = id;
    this.name = name;
    this.image = image;
    this.url = url;
    this.selected = false;
}

var obj = {
    "playlist" : [],
    addSong : function(id, name, img, url){
        var song = new Song(id, name, img, url);
        this.playlist.push(song);
        console.log(this.playlist);
    },
    deleteSong : function(id){
        var song = this.playlist.filter(function(x){
            return x.id == id;
        });
        song[0].selected = true;
        this.playlist = this.playlist.filter(function(x){
            return x.selected == false;
        })
    }
}