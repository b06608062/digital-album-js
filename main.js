var Meme = ["./pic7.jpg", "./pic8.jpeg", "./pic9.jpeg", "pic10.webp", "./pic11.jpeg"];
var PatrickStar = ["./pic1.jpeg", "./pic2.jpeg", "./pic3.jpeg", "./pic4.jpeg", "./pic5.jpeg", "./pic6.jpeg"];
var dic = {"PatrickStar" : PatrickStar, "Meme" : Meme};
var HighlightAlbum = 0;
var HighlightPhoto = 0;

var ChangeAlbum = function(paths, No){
    
    HighlightAlbum = No;
    HighlightPhoto = 0;
    let LeftBox = document.getElementById("left-box");
    let display = document.getElementById("display");
    let albumlist =document.getElementsByTagName("p");

    document.getElementById("total").innerHTML = `total : ${Meme.length+PatrickStar.length}`;
    document.getElementById("order").innerHTML = `now at : ${HighlightPhoto+1}`;

    if(No){
        albumlist[1].classList.add("ischosen");
        albumlist[0].classList.remove("ischosen");
        document.getElementById("chosen").innerHTML = `this album : ${Meme.length}`;
        if(Meme.length==0){
            document.getElementById("order").innerHTML = `now at : ${HighlightPhoto}`;
        }
    }else{
        albumlist[0].classList.add("ischosen");
        albumlist[1].classList.remove("ischosen");
        document.getElementById("chosen").innerHTML = `this album : ${PatrickStar.length}`;
        if(PatrickStar.length==0){
            document.getElementById("order").innerHTML = `now at : ${HighlightPhoto}`;
        }
    }

    while(LeftBox.firstChild){
        LeftBox.removeChild(LeftBox.firstChild);
    }

    for(i=0;i<paths.length;i++){
        let pic = document.createElement("img");
        pic.className = "pic";
        pic.src = paths[i];
        pic.setAttribute("tabindex", "0");
        pic.alt = i;
        LeftBox.appendChild(pic);
        pic.addEventListener("click", function(e){
            let pics = document.getElementsByClassName("pic");
            for(i=0;i<pics.length;i++){
                pics[i].classList.remove("focus");
            }
            display.src = e.target.src;
            e.target.classList.add("focus");
            HighlightPhoto = parseInt(e.target.alt);
            document.getElementById("order").innerHTML = `now at : ${HighlightPhoto+1}`;
            // console.log(HighlightPhoto);
        })
    }
    let inp = document.createElement("input");
    inp.placeholder = "新增相片";
    inp.addEventListener("click", function(e){
        e.target.value = "";
    })
    inp.addEventListener("keydown", function(e){
        if(e.code=="Enter" && e.target.value!="" ){
            if(HighlightAlbum){
                Meme.push(e.target.value);
                ChangeAlbum(Meme, HighlightAlbum);
            }else{
                PatrickStar.push(e.target.value);
                ChangeAlbum(PatrickStar, HighlightAlbum);
            }
        }
    })
    LeftBox.appendChild(inp);
    if(paths.length){
        display.src = paths[0];
        LeftBox.firstChild.classList.add("focus");
    }else{
        display.src = "";
    }
}

function Alert(){
    alert("This album is empty!!!");
}

function del(){
    if(HighlightAlbum){
        if(Meme.length==0) return;
        Meme.splice(HighlightPhoto, 1);
        ChangeAlbum(Meme, HighlightAlbum);
    }else{
        if(PatrickStar.length==0) return;
        PatrickStar.splice(HighlightPhoto, 1);
        ChangeAlbum(PatrickStar, HighlightAlbum);
    }
}

ChangeAlbum(PatrickStar, HighlightAlbum);
