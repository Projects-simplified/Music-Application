window.addEventListener("load",initEvent);
var audio;

function initEvent(){
    audio = document.querySelector("#audio");
    document.querySelector("#save").addEventListener("click",savePlaylist);
    document.querySelector("#load").addEventListener("click",loadPlaylist);
    displaySongs();
}

function displaySongs(){
    var ul = document.querySelector("#songList");
    for(var i=0;i<songsArray.length;i++){
        var li = document.createElement("li");
        var span = document.createElement("span");
        var img = document.createElement("img");
        var btn = document.createElement("button");
        span.innerHTML = songsArray[i].name;
        img.src = songsArray[i].imageUrl;
        img.alt = songsArray[i].id;
        li.title = songsArray[i].id;
        btn.innerHTML = "Add To PlayList";
        btn.className = "btn d-block w-100 btn-primary";
        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(btn);
        ul.appendChild(li);
        img.addEventListener("click",playSong);
        btn.addEventListener("click",addtoPlaylist);
    }
}

function playSong(){
    var currentSong = event.srcElement.alt;
    for(var i=0;i<songsArray.length;i++){
        if(songsArray[i].id == currentSong){
            songUrl = songsArray[i].songsUrl;
        }
    }
    audio.src = songUrl;
    audio.play();
}

function addtoPlaylist(){
    var id = event.srcElement.parentElement.title;
    for(var i=0;i<songsArray.length;i++){
        if(songsArray[i].id == id){
            obj.addSong(songsArray[i].id, songsArray[i].name, songsArray[i].imageUrl, songsArray[i].songsUrl);
            break;
        }
    }
    displayPlaylist();
}

function displayPlaylist(){
    var ul = document.querySelector('#playlist');
    ul.innerHTML = '';
    obj.playlist.forEach(function(x){
        var li = document.createElement("li");
        var span = document.createElement("span");
        var img = document.createElement("img");
        var btn = document.createElement("button");
        span.innerHTML = x.name;
        img.src = x.image;
        img.alt = x.id;
        li.title = x.id;
        btn.innerHTML = "Delete";
        btn.className = "btn d-block btn-primary";
        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(btn);
        ul.appendChild(li);
        img.addEventListener("click",playSong);
        btn.addEventListener("click", deleteSong);
    })
}

function deleteSong(){
    var id = event.srcElement.parentElement.title;
    for(var i=0;i<songsArray.length;i++){
        if(songsArray[i].id == id){
            obj.deleteSong(id);
            break;
        }
    }
    displayPlaylist();
}

function savePlaylist(){
    if(window.localStorage){
        var json = JSON.stringify(obj.playlist);
        localStorage.setItem('playlist',json);
    }
    else{
        alert("LocalStorage not supported!!");
    }
}

function loadPlaylist(){
    if(window.localStorage){
        var data = localStorage.getItem("playlist");
        obj.playlist = JSON.parse(data);
        displayPlaylist();
    }
}