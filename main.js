var Meme = ["./pic7.jpg", "./pic8.jpeg", "./pic9.jpeg", "pic10.webp", "./pic11.jpeg"];
var PatrickStar = ["./pic1.jpeg", "./pic2.jpeg", "./pic3.jpeg", "./pic4.jpeg", "./pic5.jpeg", "./pic6.jpeg"];
var dic = { "PatrickStar" : PatrickStar, "Meme" : Meme };
var highlightAlbum = 0;
var highlightPhoto = 0;

var changeAlbum = function(paths, No) {
    highlightAlbum = No;
    highlightPhoto = 0;
    let leftBox = document.getElementById("left-box");
    let display = document.getElementById("display");
    let albumList = document.getElementsByTagName("p");
    document.getElementById("total").innerHTML = `total : ${Meme.length + PatrickStar.length}`;
    document.getElementById("order").innerHTML = `now at : ${highlightPhoto + 1}`;
    if (No) {
        albumList[1].classList.add("ischosen");
        albumList[0].classList.remove("ischosen");
        document.getElementById("chosen").innerHTML = `this album : ${Meme.length}`;
        if (Meme.length == 0) {
            document.getElementById("order").innerHTML = `now at : ${highlightPhoto}`;
        }
    } else {
        albumList[0].classList.add("ischosen");
        albumList[1].classList.remove("ischosen");
        document.getElementById("chosen").innerHTML = `this album : ${PatrickStar.length}`;
        if (PatrickStar.length == 0) {
            document.getElementById("order").innerHTML = `now at : ${highlightPhoto}`;
        }
    }

    while (leftBox.firstChild) {
        leftBox.removeChild(leftBox.firstChild);
    }

    for (i = 0; i < paths.length; i++) {
        let pic = document.createElement("img");
        pic.className = "pic";
        pic.src = paths[i];
        pic.setAttribute("tabindex", "0");
        pic.alt = i;
        leftBox.appendChild(pic);
        pic.addEventListener("click", function(e) {
            let pics = document.getElementsByClassName("pic");
            for(i = 0; i < pics.length; i++) {
                pics[i].classList.remove("focus");
            }
            display.src = e.target.src;
            e.target.classList.add("focus");
            highlightPhoto = parseInt(e.target.alt);
            document.getElementById("order").innerHTML = `now at : ${highlightPhoto + 1}`;
            // console.log(HighlightPhoto);
        });
    }

    let inp = document.createElement("input");
    inp.placeholder = "新增相片";
    inp.addEventListener("click", function(e) {
        e.target.value = "";
    });
    inp.addEventListener("keydown", function(e) {
        if (e.code == "Enter" && e.target.value != "" ) {
            if (highlightAlbum) {
                Meme.push(e.target.value);
                changeAlbum(Meme, highlightAlbum);
            } else {
                PatrickStar.push(e.target.value);
                changeAlbum(PatrickStar, highlightAlbum);
            }
        }
    });
    leftBox.appendChild(inp);
    if (paths.length) {
        display.src = paths[0];
        leftBox.firstChild.classList.add("focus");
    } else {
        display.src = "";
    }
}

function del() {
    if (highlightAlbum) {
        if (Meme.length == 0) return;
        Meme.splice(highlightPhoto, 1);
        changeAlbum(Meme, highlightAlbum);
    } else {
        if (PatrickStar.length == 0) return;
        PatrickStar.splice(highlightPhoto, 1);
        changeAlbum(PatrickStar, highlightAlbum);
    }
}

changeAlbum(PatrickStar, highlightAlbum);
