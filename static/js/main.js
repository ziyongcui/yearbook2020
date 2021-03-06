const MAX_NUM_COLUMNS = 4;

$.get("/get_school_name", function(school){
    $("#school").text(school);
});

if(urlParams.get("sent_message")){
  $.notify("You successfully sent a message", "success");
}

if(urlParams.get("sent_request")){
  $.notify("You successfully requested a user!", "success");
}

if(urlParams.get("error")) {
  $.notify(urlParams.get("error"), "error");
}

function afterSpace(full_name){
  return full_name.substring(full_name.indexOf(" ")+1);
}

$.get("/getProfiles", function(data){
    let allRows = [];

    let currentRow = [];
    let ct = 0;

    let ppl_uuids = Object.keys(data);

    ppl_uuids.sort((a,b)=>{
      if( afterSpace(data[a].name) < afterSpace(data[b].name) ){
        return -1;
      }
      else {
        return 1;
      }
    });

    let blah = 0
    for(let i in ppl_uuids){
      uuid = ppl_uuids[i];
      if(ct % MAX_NUM_COLUMNS == 0 && ct != 0){
        allRows.push(currentRow);
        currentRow = [];
      }

      let link = `/sendmessages?sendto=${uuid}`;

      let currentCard = $(`<div class='face-card' id="card_${uuid}" onclick='window.location.href="${link}"'></div>`);
      currentCard.append($(`<img id="img_${uuid}" class="pfp-image" alt="profile picture missing" src="${pfp_path}/${uuid}.png" height="50%" onerror="this.onerror=null; this.src='${assets_path}/panda.png';"></img>`));
      let nameText = $(`<h2 id="my${uuid}" style="font-size:2.5vw"></h2>`);
      nameText.text(data[uuid].name);
      currentCard.append(nameText);
      let bioText = $(`<p id="bio${uuid}"></p>`)
      bioText.text(data[uuid].bio);
      currentCard.append(bioText);
      currentRow.push(currentCard);
      ct++;

    }


    while(ct % MAX_NUM_COLUMNS != 0){
      ct++;
      currentRow.push($("<div class='col-sm face-card'></div>"));
    }
    allRows.push(currentRow);

    for(let i = 0; i < MAX_NUM_COLUMNS; i++){
      let currentColumn = $("<div class='column'></div>");
      for (row in allRows){
        currentColumn.append(allRows[row][i]);
      }
      $("#faces").append(currentColumn);
    }
    setTimeout(()=>{ $("#card_f37155b4-0613-5f9d-a7d4-c0b85f4794a6").attr("onclick", 'window.location.href="https://www.gofundme.com/f/in-loving-memory-of-cleo-athena-theodoropulos"');
}, 1000);


      $("#img_9a7280d1-fce2-579d-8551-32de0ccdfadf61295").css("background-image", 'url("static/assets/vortex.gif")');

});

var cw = $(".face-card").width();
$(".face-card").css({
    'height': cw + 'px'
});

function search_name(){
  let name = $("#search").val();
  if(name){
    let img_elt = document.getElementById("img_"+name);
    if(img_elt)
      img_elt.scrollIntoView();
  }
}


function drawCheckmarkOnload(div_id){
	let div_elt = document.getElementById(div_id);
	if(div_elt){
		div_elt.innerHTML += "&#x2713"; // checkmark
	}
	else{
		setTimeout(()=>{drawCheckmarkOnload(div_id)}, 1000);
	}
}
$.get("/get_uuids_sentto", (uuids_sentto)=>{
	for(let i in uuids_sentto){
		drawCheckmarkOnload("my" + uuids_sentto[i]);
	}
});

/*
//temporarily diable search bar
document.getElementById("search").addEventListener("keyup", function(event){
  if(event.keyCode=== 13){
    event.preventDefault();
    search_name();
  }
});
*/

