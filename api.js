function totalStats(filter){
  scoreKDA_list = document.querySelectorAll(".match" + filter + ":not(.model)" + " .matchStats .matchContent .scoreKDA");
  otherStats_list = document.querySelectorAll(".match" + filter + ":not(.model)" + " .matchStats .matchContent .otherStats");
  roles_list = document.querySelectorAll(".match" + filter + ":not(.model)" + " .matchStats .lane");
 
  let numberOfMatches = scoreKDA_list.length;
  console.log(numberOfMatches);
  
  let averageKills = 0
  let averageDeaths = 0;
  let averageAssists = 0;
  let averageKDA = 0;
  let averagePKILL= 0;

  let n_TOP = 0;
  let n_JUNGLER = 0;
  let n_MIDDLE = 0;
  let n_BOTTOM = 0;
  let n_SUPPORT = 0;


  if(numberOfMatches>0){
    let n_wins = document.querySelectorAll(".match" + filter + ".victory").length;
    let n_losses = document.querySelectorAll(".match" + filter + ".defeat").length;


    for(i=0; i<otherStats_list.length; i++){
      const PKill = parseInt(otherStats_list[i].querySelector(".PKill").textContent.replace("P/KILL ", "").replace("%", ""));
      averagePKILL+=PKill;
    }

    for(role of roles_list){
      if(role.textContent == "TOP") n_TOP++;
      else if(role.textContent == "JUNGLE") n_JUNGLER++;
      else if(role.textContent == "MIDDLE") n_MIDDLE++; 
      else if(role.textContent == "BOTTOM") n_BOTTOM++;
      else if(role.textContent == "UTILITY") n_SUPPORT++; 
    }

    
    for(i=0; i<scoreKDA_list.length; i++){
      const kills = parseInt(scoreKDA_list[i].querySelector(".score .kills").textContent);
      const deaths = parseInt(scoreKDA_list[i].querySelector(".score .deaths").textContent);
      const assists = parseInt(scoreKDA_list[i].querySelector(".score .assists").textContent);
    
      averageKills+= kills;
      averageDeaths+= deaths;
      averageAssists+= assists;
    }

    averageKDA = ((averageKills+averageAssists)/averageDeaths).toFixed(2);
    averageKills = (averageKills/numberOfMatches).toFixed(1);
    averageDeaths = (averageDeaths/numberOfMatches).toFixed(1);
    averageAssists = (averageAssists/numberOfMatches).toFixed(1);
    averagePKILL = (averagePKILL/numberOfMatches).toFixed(1);

    document.querySelector("#wrNumbers .totGames").textContent= numberOfMatches + "G";
    document.querySelector("#wrNumbers .wonGames").textContent= n_wins + "W";
    document.querySelector("#wrNumbers .lostGames").textContent= n_losses + "L";

    document.querySelector("#score1 .kills").textContent= averageKills;
    document.querySelector("#score1 .deaths").textContent= averageDeaths;
    document.querySelector("#score1 .assists").textContent= averageAssists;

    document.querySelector("#score2 .KDA").textContent= averageKDA;
    document.querySelector("#score3 .PKill").textContent= averagePKILL;

    console.log(n_TOP/numberOfMatches);

    document.querySelector("#barsContainer .top .blueBar").style.height = (n_TOP/numberOfMatches)*100 + "%";
    document.querySelector("#barsContainer .jun .blueBar").style.height = (n_JUNGLER/numberOfMatches*100) + "%";
    document.querySelector("#barsContainer .mid .blueBar").style.height = (n_MIDDLE/numberOfMatches*100) + "%";
    document.querySelector("#barsContainer .bot .blueBar").style.height = (n_BOTTOM/numberOfMatches*100) + "%";
    document.querySelector("#barsContainer .sup .blueBar").style.height = (n_SUPPORT/numberOfMatches*100) + "%";

    const perc_wins = (n_wins/numberOfMatches* 100).toFixed(0);
    const perc_losses = (n_losses/numberOfMatches* 100).toFixed(0);
    
    const slicewinrate = document.querySelector("#slicewinrate");
    if(n_wins == n_losses){
      slicewinrate.classList.remove("moreWins");
      slicewinrate.classList.remove("moreLosses");
      slicewinrate.classList.add("equalWinsLosses");
    }
    else if(n_wins > n_losses){
      slicewinrate.classList.remove("equalWinsLosses");
      slicewinrate.classList.remove("moreLosses");
      slicewinrate.classList.add("moreWins");
    }
    else {
      slicewinrate.classList.remove("equalWinsLosses");
      slicewinrate.classList.remove("moreWins");
      slicewinrate.classList.add("moreLosses");
    }

    /*90 -looseRate*360  per losses*/
    /*- 360 + winrate*360 per wins*/

    const moreWinsAngle = - 360 + perc_wins/100 * 360;
    const moreLossesAngle = 90 - perc_losses/100 * 360;

    if(slicewinrate.classList.contains("moreWins")) {
      slicewinrate.style.transform = "rotate(" + moreWinsAngle + "deg)";
    }
    if(slicewinrate.classList.contains("moreLosses")) {
      slicewinrate.style.transform = "rotate(" + moreLossesAngle + "deg)";
    }

    const slicewinrate2 = document.querySelector("#slicewinrate2");
    if(perc_losses > 75){
      slicewinrate2.classList.remove("moreWins")
      slicewinrate2.classList.add("moreLosses")
      slicewinrate2.classList.remove("hidden")
    } 
    else if(perc_wins > 75){
      slicewinrate2.classList.remove("moreLosses")
      slicewinrate2.classList.add("moreWins")
      slicewinrate2.classList.remove("hidden")
    } 
    else slicewinrate2.classList.add("hidden")

    document.querySelector("#hole span").textContent= perc_wins + "%";
    document.querySelector('#totalStats').classList.remove("hidden");
  }
  else{
    document.querySelector('#totalStats').classList.add("hidden");
  }
}

function filterMatches(event){
  const filterButtons = document.querySelectorAll("#mainC2 #matchesNav span");
  const button = event.currentTarget;
  const buttonType = button.textContent;
  const matchList = document.querySelectorAll("#mainC2 .match");

  if(!button.classList.contains('clicked')){
    for(item of filterButtons) item.classList.remove("clicked");
    button.classList.add('clicked');
    if(buttonType == "All"){
      for(match of matchList){
        match.classList.remove("hidden");
      }
      totalStats("");
    }
    else if(buttonType == "Ranked Solo/Duo"){
      for(match of matchList){
        if(match.classList.contains("Solo")) match.classList.remove("hidden");
        else match.classList.add("hidden");
      }
      totalStats(".Solo");
    }
    else if(buttonType == "Ranked Flex"){
      for(match of matchList){
        if(match.classList.contains("Flex")) match.classList.remove("hidden");
        else match.classList.add("hidden");
      }
      totalStats(".Flex");
    }
    else if(buttonType == "Other"){
      for(match of matchList){
        if(match.classList.contains("Other")) match.classList.remove("hidden");
        else match.classList.add("hidden");
      }
      totalStats(".Other");
    }
  }
}



function SearchPartecipant(gameName, tagLine, puuid){
    localStorage.setItem('puuid', puuid);
    localStorage.setItem('gameName', gameName);
    localStorage.setItem('tagLine', tagLine);
    window.location.href = 'Summoner.html';
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function convertElo(tier, rank, points){
  let totalEloPoints = parseInt(eloRankCalculator[tier]);
  totalEloPoints += parseInt(points);
  if(tier == "MASTER" || tier == "CHALLENGER") return totalEloPoints;
  totalEloPoints += parseInt((eloDivisionCalculator[rank]*100))
  

  return totalEloPoints;

}

async function onJsonMatchByID(json){
  console.log(json);
  /****************************/

  const matchBox = document.querySelector('.match');
  const newMatchBox = document.createElement('div');
  newMatchBox.classList.add('match');
  newMatchBox.innerHTML = matchBox.innerHTML;
  document.querySelector('#mainC2').appendChild(newMatchBox);
  const partecipants = json["info"]["participants"];
  const l = partecipants.length;
 
  let allPlayersInfo = new Array(l);
  for(i=0; i<l; i++){
    allPlayersInfo[i] = {
      "puuid": undefined,
      "teamId": undefined,
      "win": undefined,
      "kills": undefined,
      "assists": undefined,
      "deaths": undefined,
      "champLevel": undefined,
      "championName": undefined,
      "visionWardsBoughtInGame": undefined,
      "item0": undefined,
      "item1": undefined,
      "item2": undefined,
      "item3": undefined,
      "item4": undefined,
      "item5": undefined,
      "item6": undefined,
      "summoner1Id": undefined,
      "summoner2Id": undefined,
      "totalMinionsKilled": undefined,
      "totalAllyJungleMinionsKilled": undefined,
      "totalEnemyJungleMinionsKilled": undefined,
      "neutralMinionsKilled": undefined,
      "wardsKilled": undefined,
      "wardsPlaced": undefined,
      "baronKills": undefined,
      "dragonKills": undefined,
      "lane": undefined,
      "riotIdGameName": undefined,
      "riotIdTagline": undefined,
      "summonerName": undefined,
      "specificPrimaryRuneId": undefined,
      "primaryRuneId": undefined,
      "secondaryRuneId": undefined,
      "totalDamageDealtToChampions": undefined,
      "totalDamageTaken": undefined,
      "goldEarned": undefined
     
    };
  }

  let myIndex;
  let totalKills = 0;
  let myTeam;


  
  for(i=0; i<partecipants.length; i++){
      if(partecipants[i]["puuid"] == puuid) {
        myIndex=i;
      }
        allPlayersInfo[i]["puuid"] = partecipants[i]["puuid"];
        allPlayersInfo[i]["teamId"] = partecipants[i]["teamId"];
        allPlayersInfo[i]["win"] = partecipants[i]["win"]; 
        allPlayersInfo[i]["kills"] = partecipants[i]["kills"];
        allPlayersInfo[i]["assists"] = partecipants[i]["assists"]; 
        allPlayersInfo[i]["deaths"] = partecipants[i]["deaths"];
        allPlayersInfo[i]["champLevel"] = partecipants[i]["champLevel"]; 
        allPlayersInfo[i]["championName"] = partecipants[i]["championName"];
        allPlayersInfo[i]["visionWardsBoughtInGame"] = partecipants[i]["visionWardsBoughtInGame"]; 
        allPlayersInfo[i]["summoner1Id"] = partecipants[i]["summoner1Id"];
        allPlayersInfo[i]["summoner2Id"] = partecipants[i]["summoner2Id"]; 
        allPlayersInfo[i]["totalMinionsKilled"] = partecipants[i]["totalMinionsKilled"];
        allPlayersInfo[i]["item0"] = partecipants[i]["item0"]; 
        allPlayersInfo[i]["item1"] = partecipants[i]["item1"];
        allPlayersInfo[i]["item2"] = partecipants[i]["item2"]; 
        allPlayersInfo[i]["item3"] = partecipants[i]["item3"];
        allPlayersInfo[i]["item4"] = partecipants[i]["item4"]; 
        allPlayersInfo[i]["item5"] = partecipants[i]["item5"];
        allPlayersInfo[i]["item6"] = partecipants[i]["item6"];
        allPlayersInfo[i]["totalAllyJungleMinionsKilled"] = partecipants[i]["totalAllyJungleMinionsKilled"];
        allPlayersInfo[i]["totalEnemyJungleMinionsKilled"] = partecipants[i]["totalEnemyJungleMinionsKilled"];
        allPlayersInfo[i]["neutralMinionsKilled"] = partecipants[i]["neutralMinionsKilled"];
        allPlayersInfo[i]["wardsKilled"] = partecipants[i]["wardsKilled"];
        allPlayersInfo[i]["wardsPlaced"] = partecipants[i]["wardsPlaced"];
        allPlayersInfo[i]["baronKills"] = partecipants[i]["baronKills"];
        allPlayersInfo[i]["dragonKills"] = partecipants[i]["dragonKills"];
        allPlayersInfo[i]["lane"] = partecipants[i]["teamPosition"];
        allPlayersInfo[i]["riotIdGameName"] = partecipants[i]["riotIdGameName"];
        allPlayersInfo[i]["riotIdTagline"] = partecipants[i]["riotIdTagline"];
        allPlayersInfo[i]["summonerName"] = partecipants[i]["summonerName"];
        allPlayersInfo[i]["specificPrimaryRuneId"] = partecipants[i]["perks"]["styles"][0]["selections"][0]["perk"];
        allPlayersInfo[i]["primaryRuneId"] = partecipants[i]["perks"]["styles"][0]["style"];
        allPlayersInfo[i]["secondaryRuneId"] = partecipants[i]["perks"]["styles"][1]["style"];
        allPlayersInfo[i]["totalDamageDealtToChampions"] = partecipants[i]["totalDamageDealtToChampions"];
        allPlayersInfo[i]["totalDamageTaken"] = partecipants[i]["totalDamageTaken"];
        allPlayersInfo[i]["goldEarned"] = partecipants[i]["goldEarned"];
    } 
  


  //Tipo di partita
  const queueId = json["info"]["queueId"];
  let fullQueueName;
  let queueName;
  for(item of queueJson){
    if(item["queueId"] == queueId) {
      fullQueueName = item["description"];
      queueName = item["description"].replace('games', '').replace('Ranked', 'Rank').replace('(Quickplay)', '').trim();
    }
  }

  let queueClass;

  if(queueName == "5v5 Rank Solo") queueClass = "Solo";
  else if(queueName == "5v5 Rank Flex") queueClass = "Flex";
  else queueClass = "Other";

  console.log(queueName);
  newMatchBox.querySelector(".matchContent .Description .matchType").textContent = queueName;
  newMatchBox.classList.add(queueClass);

  //Data e durata partita
  newMatchBox.querySelector(".Description .date").textContent = convertTimeStampToStringData(json["info"]["gameCreation"]).replace(',', '');
  newMatchBox.querySelector(".Description .duration").textContent = secondiAMinutiESecondi(json["info"]["gameDuration"]);
  //Lane
  const lane = document.createElement("span");
  lane.textContent = allPlayersInfo[myIndex]["lane"];
  lane.classList.add("lane");
  lane.classList.add("hidden");
  newMatchBox.querySelector(".matchStats").appendChild(lane);

  //Esito partita
  const myTeamId = allPlayersInfo[myIndex]["teamId"];
  let enemyTeamId;
  if(myTeamId == 100) enemyTeamId = 200;
  else enemyTeamId = 100;

  if(allPlayersInfo[myIndex]["win"] == false) {
    newMatchBox.querySelector(".Description .result").textContent = "Defeat";
    newMatchBox.querySelector(".moreStats .team1 .winOrLoss").textContent = "Defeat";
    newMatchBox.querySelector(".moreStats .team2 .winOrLoss").textContent = "Victory";
    newMatchBox.classList.add('defeat');
  }
  else {
    newMatchBox.querySelector(".Description .result").textContent = "Victory";
    newMatchBox.querySelector(".moreStats .team1 .winOrLoss").textContent = "Victory";
    newMatchBox.querySelector(".moreStats .team2 .winOrLoss").textContent = "Defeat";
    newMatchBox.classList.add('victory');
  }
  //KDA
  newMatchBox.querySelector(".mainUpper .scoreKDA .kills").textContent=allPlayersInfo[myIndex]["kills"];
  newMatchBox.querySelector(".mainUpper .scoreKDA .deaths").textContent=allPlayersInfo[myIndex]["deaths"];
  newMatchBox.querySelector(".mainUpper .scoreKDA .assists").textContent=allPlayersInfo[myIndex]["assists"];

  let kda;
  if(allPlayersInfo[myIndex]["deaths"]!=0){
    kda = (allPlayersInfo[myIndex]["kills"] + allPlayersInfo[myIndex]["assists"])/allPlayersInfo[myIndex]["deaths"];
    newMatchBox.querySelector(".mainUpper .scoreKDA .KDA").textContent= kda.toFixed(2) + ":1 KDA";
  }
  else {
    kda = (allPlayersInfo[myIndex]["kills"] + allPlayersInfo[myIndex]["assists"]);
    newMatchBox.querySelector(".mainUpper .scoreKDA .KDA").textContent= "Perfect " + "KDA"
  }
  

  let champIcon_url = "https://ddragon.leagueoflegends.com/cdn/" + game_version + "/img/champion/" + allPlayersInfo[myIndex]["championName"] + ".png";
  if(allPlayersInfo[myIndex]["championName"] == "FiddleSticks") {
    champIcon_url = "https://ddragon.leagueoflegends.com/cdn/" + game_version + "/img/champion/" + "Fiddlesticks" + ".png";
  }
  newMatchBox.querySelector(".mainUpper .champIcon").style.backgroundImage = 'url(' + champIcon_url + ')';
  newMatchBox.querySelector(".mainUpper .champIcon span").textContent=allPlayersInfo[myIndex]["champLevel"];


  let summoner1Name;
  let summoner2Name;

  for(key in summonersJson){
    const summoner = summonersJson[key];
    if(summoner["key"] == allPlayersInfo[myIndex]["summoner1Id"]) {
      summoner1Name = summoner["id"];
    } 
    if(summoner["key"] == allPlayersInfo[myIndex]["summoner2Id"]) {
      summoner2Name = summoner["id"];
    }
  }
  newMatchBox.querySelector(".mainUpper .summonersIcons img.sum1").src= "https://ddragon.leagueoflegends.com/cdn/" + game_version + "/img/spell/" + summoner1Name + ".png"
  newMatchBox.querySelector(".mainUpper .summonersIcons img.sum2").src= "https://ddragon.leagueoflegends.com/cdn/" + game_version + "/img/spell/" + summoner2Name + ".png"

  //https://ddragon.leagueoflegends.com/cdn/14.7.1/img/item/1055.png
  const item_url = "https://ddragon.leagueoflegends.com/cdn/" + game_version + "/img/item/"
  newMatchBox.querySelector(".mainLower .item[data-num='0']").src= item_url + allPlayersInfo[myIndex]["item0"] + ".png"
  newMatchBox.querySelector(".mainLower .item[data-num='1']").src= item_url + allPlayersInfo[myIndex]["item1"] + ".png"
  newMatchBox.querySelector(".mainLower .item[data-num='2']").src= item_url + allPlayersInfo[myIndex]["item2"] + ".png"
  newMatchBox.querySelector(".mainLower .item[data-num='3']").src= item_url + allPlayersInfo[myIndex]["item3"] + ".png"
  newMatchBox.querySelector(".mainLower .item[data-num='4']").src= item_url + allPlayersInfo[myIndex]["item4"] + ".png"
  newMatchBox.querySelector(".mainLower .item[data-num='5']").src= item_url + allPlayersInfo[myIndex]["item5"] + ".png"
  newMatchBox.querySelector(".mainLower .ward").src= item_url + allPlayersInfo[myIndex]["item6"] + ".png"

  const items = newMatchBox.querySelectorAll(".mainLower .item");
  for(item of items){
    if(item.src != item_url + "0.png") item.classList.remove('hidden');
  }
  const ward = newMatchBox.querySelector(".mainLower .ward");
  if(ward.src != item_url + "0.png") ward.classList.remove('hidden');

  newMatchBox.querySelector(".otherStats .wards").textContent = "Control Ward " + allPlayersInfo[myIndex]["visionWardsBoughtInGame"];
  

  let gameLenght = secondiAMinuti(json["info"]["gameDuration"]);
  const totalCS = allPlayersInfo[myIndex]["totalMinionsKilled"] + allPlayersInfo[myIndex]["neutralMinionsKilled"];
  const csPerMin = (totalCS)/gameLenght;
  newMatchBox.querySelector(".otherStats .cs").textContent = "CS " + totalCS + " (" + csPerMin.toFixed(1) + ")";

  //PKILL = mykill/totalkills.toFixed(2) *100
  myTeam=allPlayersInfo[myIndex]["teamId"];

  for(i=0; i<allPlayersInfo.length; i++){
    if(allPlayersInfo[i]["teamId"] == myTeam)totalKills += allPlayersInfo[i]["kills"];
  }

  const PKill = Math.floor(((allPlayersInfo[myIndex]["kills"] + allPlayersInfo[myIndex]["assists"]) / totalKills) * 100);
  newMatchBox.querySelector(".otherStats .PKill").textContent = "P/KILL " + PKill + "%";

  // RUNES IMAGES
  let primaryRune_url;
  let secondaryRune_url;


  for(i=0; i<runesJson.length; i++){
    if(runesJson[i]["id"] == allPlayersInfo[myIndex]["secondaryRuneId"]) {
      secondaryRune_url = "Runes/" + runesJson[i]["icon"];
    }
    if(runesJson[i]["id"] == allPlayersInfo[myIndex]["primaryRuneId"]){
      const specificRuneArray = runesJson[i]["slots"][0]["runes"];
      for(let i=0; i<specificRuneArray.length; i++){
        if(specificRuneArray[i]["id"] == allPlayersInfo[myIndex]["specificPrimaryRuneId"]) primaryRune_url = "Runes/" + specificRuneArray[i]["icon"];
      }
    }
  }

  newMatchBox.querySelector(".runesIcons .mainRune").src = primaryRune_url;
  newMatchBox.querySelector(".runesIcons .secondaryRune").src = secondaryRune_url;

  //ICONE E NOMI EVOCATORI IN PARTITA
  

  let totalKillsEnemy = 0;
  let totalGold = 0;
  let totalGoldEnemy = 0;

  for(let j=0; j<allPlayersInfo.length; j++){
    if(allPlayersInfo[j]["teamId"] == enemyTeamId) {
      totalKillsEnemy += allPlayersInfo[j]["kills"];
      totalGoldEnemy += allPlayersInfo[j]["goldEarned"];
    }
    else totalGold += allPlayersInfo[j]["goldEarned"];
  }

  killsBarWidth = 100 * totalKillsEnemy/(totalKillsEnemy + totalKills);
  goldBarWidth = 100 * totalGoldEnemy/(totalGoldEnemy + totalGold);

  newMatchBox.querySelector(".bars .totalKill .enemyBar").style.width = killsBarWidth + "%";
  newMatchBox.querySelector(".bars .totalGold .enemyBar").style.width = goldBarWidth + "%";

  let max_totalDamageDealt = 0;
  let max_totalDamageTaken = 0;

  for(let i=0; i<allPlayersInfo.length; i++){
    if(allPlayersInfo[i]["totalDamageDealtToChampions"] > max_totalDamageDealt) max_totalDamageDealt = allPlayersInfo[i]["totalDamageDealtToChampions"];
    if(allPlayersInfo[i]["totalDamageTaken"] > max_totalDamageTaken) max_totalDamageTaken = allPlayersInfo[i]["totalDamageTaken"];
  }
 
  for(let i=0; i<allPlayersInfo.length; i++){
    let partecipantTeam;
    let index;
    if(i>4) {
      index = i-5;
    }
    else index = i;
    if(allPlayersInfo[i]["teamId"] == myTeamId){
      partecipantTeam = newMatchBox.querySelector(".matchStats .team.team1");
      partecipantTeam2 = newMatchBox.querySelector(".moreStats .teamStats.team1");
    }
    else{
      partecipantTeam = newMatchBox.querySelector(".matchStats .team.team2");
      partecipantTeam2 = newMatchBox.querySelector(".moreStats .teamStats.team2");
    }

   
    const partecipantDiv = partecipantTeam.querySelector(".player.player" + index);
    const partecipantDiv2 = partecipantTeam2.querySelector(".player.player" + index);
    

    let champImg_url = "https://ddragon.leagueoflegends.com/cdn/" + game_version + "/img/champion/" + allPlayersInfo[i]["championName"] + ".png";
    if(allPlayersInfo[i]["championName"] == "FiddleSticks") champImg_url = "https://ddragon.leagueoflegends.com/cdn/" + game_version + "/img/champion/" + "Fiddlesticks" + ".png";
    partecipantDiv.querySelector("img").src = champImg_url;
    partecipantDiv2.querySelector(".champIcon").style.backgroundImage = 'url(' + champImg_url +')';
    
    

    let partecipantName = allPlayersInfo[i]["riotIdGameName"];
    if(partecipantName == undefined) partecipantName = allPlayersInfo[i]["summonerName"];
    let partecipantNameReduced = partecipantName;
    if(partecipantName.length>=8) partecipantNameReduced=partecipantName.substring(0, 7) + "..."
    partecipantDiv.querySelector("span").textContent = partecipantNameReduced;
    partecipantDiv2.querySelector(".summonerName").textContent = partecipantName;

    partecipantDiv2.querySelector(".champIcon span").textContent=allPlayersInfo[i]["champLevel"];

    //Event listener per ogni partecipante
    partecipantDiv.querySelector("span").addEventListener('click', function() {
      SearchPartecipant(partecipantName, allPlayersInfo[i]["riotIdTagline"], allPlayersInfo[i]["puuid"])
    });
    partecipantDiv2.querySelector(".summonerName").addEventListener('click', function() {
      SearchPartecipant(partecipantName, allPlayersInfo[i]["riotIdTagline"], allPlayersInfo[i]["puuid"])
    });

     
    let summoner1Name;
    let summoner2Name;

    for(key in summonersJson){
      const summoner = summonersJson[key];
      if(summoner["key"] == allPlayersInfo[i]["summoner1Id"]) {
        summoner1Name = summoner["id"];
      } 
      if(summoner["key"] == allPlayersInfo[i]["summoner2Id"]) {
        summoner2Name = summoner["id"];
      }
    }
    partecipantDiv2.querySelector(".summonersIcons img.sum1").src= "https://ddragon.leagueoflegends.com/cdn/" + game_version + "/img/spell/" + summoner1Name + ".png"
    partecipantDiv2.querySelector(".summonersIcons img.sum2").src= "https://ddragon.leagueoflegends.com/cdn/" + game_version + "/img/spell/" + summoner2Name + ".png"
    
    //https://ddragon.leagueoflegends.com/cdn/14.7.1/img/item/1055.png
    const item_url = "https://ddragon.leagueoflegends.com/cdn/" + game_version + "/img/item/"
    partecipantDiv2.querySelector(".items .item[data-num='0']").src= item_url + allPlayersInfo[i]["item0"] + ".png"
    partecipantDiv2.querySelector(".items .item[data-num='1']").src= item_url + allPlayersInfo[i]["item1"] + ".png"
    partecipantDiv2.querySelector(".items .item[data-num='2']").src= item_url + allPlayersInfo[i]["item2"] + ".png"
    partecipantDiv2.querySelector(".items .item[data-num='3']").src= item_url + allPlayersInfo[i]["item3"] + ".png"
    partecipantDiv2.querySelector(".items .item[data-num='4']").src= item_url + allPlayersInfo[i]["item4"] + ".png"
    partecipantDiv2.querySelector(".items .item[data-num='5']").src= item_url + allPlayersInfo[i]["item5"] + ".png"
    partecipantDiv2.querySelector(".items .item[data-num='6']").src= item_url + allPlayersInfo[i]["item6"] + ".png"

    const items = partecipantDiv2.querySelectorAll(".items .item");
    for(item of items){
      if(item.src != item_url + "0.png") item.classList.remove('hidden');
    }

    
    partecipantDiv2.querySelector(".wards .pink").textContent =  allPlayersInfo[i]["visionWardsBoughtInGame"];
    partecipantDiv2.querySelector(".wards .placedKilled").textContent =  allPlayersInfo[i]["wardsPlaced"] + "/" + allPlayersInfo[i]["wardsKilled"]
  

    const totalCS = allPlayersInfo[i]["totalMinionsKilled"] + allPlayersInfo[i]["neutralMinionsKilled"];
    const csPerMin = (totalCS)/gameLenght;
    partecipantDiv2.querySelector(".cs > span:first-child").textContent = totalCS;
    partecipantDiv2.querySelector(".cs > span:nth-child(2)").textContent = csPerMin.toFixed(1) + "/m";
    
  //PKILL = mykill/totalkills.toFixed(2) *100

  let partecipantTeamTotalKills = totalKills;
  if(allPlayersInfo[i]["teamId"] == enemyTeamId) partecipantTeamTotalKills = totalKillsEnemy;

  const PKill = Math.floor(((allPlayersInfo[i]["kills"] + allPlayersInfo[i]["assists"]) / partecipantTeamTotalKills) * 100);
  partecipantDiv2.querySelector(".Kda .kPerc").textContent = "(" +  PKill + "%" + ")";

  
   //KDA
   partecipantDiv2.querySelector(".Kda .UMA").textContent= allPlayersInfo[i]["kills"] + "/" + allPlayersInfo[i]["deaths"] + "/" + allPlayersInfo[i]["assists"];
 
   let kda;
   if(allPlayersInfo[i]["deaths"]!=0){
     kda = (allPlayersInfo[i]["kills"] + allPlayersInfo[i]["assists"])/allPlayersInfo[i]["deaths"];
     partecipantDiv2.querySelector(".Kda .kdaPerc").textContent= kda.toFixed(2) + ":1";
   }
   else {
     kda = (allPlayersInfo[i]["kills"] + allPlayersInfo[i]["assists"]);
     partecipantDiv2.querySelector(".Kda .kdaPerc").textContent= "Perfect ";
   }

   
  // RUNES IMAGES
  let partecipantPrimaryRune_url;
  let partecipantSecondaryRune_url;


  for(let j=0; j<runesJson.length; j++){
    if(runesJson[j]["id"] == allPlayersInfo[i]["secondaryRuneId"]) {
      partecipantSecondaryRune_url = "Runes/" + runesJson[j]["icon"];
    }
    if(runesJson[j]["id"] == allPlayersInfo[i]["primaryRuneId"]){
      const specificRuneArray = runesJson[j]["slots"][0]["runes"];
      for(let k=0; k<specificRuneArray.length; k++){
        if(specificRuneArray[k]["id"] == allPlayersInfo[i]["specificPrimaryRuneId"]) partecipantPrimaryRune_url = "Runes/" + specificRuneArray[k]["icon"];
      }
    }
  }


    partecipantDiv2.querySelector(".runesIcons .mainRune").src = partecipantPrimaryRune_url;
    partecipantDiv2.querySelector(".runesIcons .secondaryRune").src = partecipantSecondaryRune_url;

    partecipantDiv2.querySelector(".damage > span:first-child").textContent = allPlayersInfo[i]["totalDamageDealtToChampions"];
    partecipantDiv2.querySelector(".damage > span:nth-child(2)").textContent = allPlayersInfo[i]["totalDamageTaken"];
    partecipantDiv2.querySelector(".damage .dmgDealt .fillBar").style.width = (allPlayersInfo[i]["totalDamageDealtToChampions"]/max_totalDamageDealt)*100 + "%";
    partecipantDiv2.querySelector(".damage .dmgTaken .fillBar").style.width = (allPlayersInfo[i]["totalDamageTaken"]/max_totalDamageTaken)*100 + "%";
  }
 
  newMatchBox.querySelector(".bars .totalKill .myTeamStat").textContent = totalKills;
  newMatchBox.querySelector(".bars .totalKill .enemyTeamStat").textContent = totalKillsEnemy;
  newMatchBox.querySelector(".bars .totalGold .myTeamStat").textContent = totalGold;
  newMatchBox.querySelector(".bars .totalGold .enemyTeamStat").textContent = totalGoldEnemy;

  matchEnding = newMatchBox.querySelector(".matchEnding");
  matchEnding.addEventListener("click", showMoreStats);
 
  
  //ELO MEDIO **************
  
  //function wait(milliseconds) {
  //  return new Promise(resolve => setTimeout(resolve, milliseconds));
  //}
  //await wait(0); 
  
  let totalEloInTheGame = 0;

  async function getPlayerElo(playerInfo){
 
    const summoner_v4_url = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/" + playerInfo["puuid"] + "?api_key=" + API_KEY;

    const response_summoner = await fetch(summoner_v4_url);
    const summoner_json = await response_summoner.json();

    
    const league_v4_url = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + summoner_json.id + "?api_key=" +  API_KEY;
    const response_league = await fetch(league_v4_url);
    const league_json = await response_league.json();
    
    let tier;
    let rank;
    let points;
    let ranked_solo_index = -1;

    
    if(fullQueueName == "5v5 Ranked Flex games") fullQueueName = "RANKED_FLEX_SR";
    if(fullQueueName == "5v5 Ranked Solo games") fullQueueName = "RANKED_SOLO_5x5";
        
    if(league_json[0]["queueType"] == "RANKED_SOLO_5x5") {
        ranked_solo_index = 0;
    }
    else if(league_json.length == 2 && league_json[1]["queueType"] == "RANKED_SOLO_5x5")
       ranked_solo_index = 1;
    
    
    if(league_json.lenght == 0){
      tier = "IRON";
      rank = "IV";
      points = "0";
    }

    else if(league_json[0]["queueType"] == fullQueueName) {
      tier = league_json[0]["tier"];
      rank = league_json[0]["rank"];
      points = league_json[0]["leaguePoints"];
    }
    else if(league_json.length > 1 && league_json[1]["queueType"] == fullQueueName){
      tier = league_json[1]["tier"];
      rank = league_json[1]["rank"];
      points = league_json[1]["leaguePoints"];
    }
    else if(ranked_solo_index!=-1 && fullQueueName!="RANKED_FLEX_SR"){
      tier = league_json[ranked_solo_index]["tier"];
      rank = league_json[ranked_solo_index]["rank"];
      points = league_json[ranked_solo_index]["leaguePoints"];
    }
    else{
      tier = "IRON";
      rank = "IV";
      points = "0";
    }
      
    
    console.log("tier: " + tier + " rank: " + rank + " points: " + points);
    console.log(convertElo(tier,rank,points));
    totalEloInTheGame += convertElo(tier, rank, points);
    console.log("total elo is now: " + totalEloInTheGame);
  //}, 20)
  }

  async function getAllPlayersElo (allPlayersInfo){
    for(i=0; i<allPlayersInfo.length; i++){
      await getPlayerElo(allPlayersInfo[i]);
     }
  }
  
  //await getAllPlayersElo(allPlayersInfo); //****************************************/
  // SE VOGLIO CALCOLARE L'ELO MEDIO DI OGNI PARTITA BASTA DECOMMENTARE IL SEGUENTE CODICE MA POSSO CARICARE AL MASSIMO 4 PARTITE,
  // PERCHE' ALTRIMENTI SUPERO IL LIMITE DI RICHIESTE API PER MINUTO IMPOSTO DA RIOT DEVELOPERS
  // CIOE' DI 100 RICHIESTE AL MINUTO
/*
  const averageEloInTheGame = totalEloInTheGame/allPlayersInfo.length;
  const parteIntera = Math.floor(averageEloInTheGame/400); 
  const resto = averageEloInTheGame % 400; 

  
  let averageEloTier;
  let averageEloRank;
 

  for (const key in eloRankCalculator) {
    if (eloRankCalculator[key] === parteIntera*400) {
      averageEloTier = key;
    }
  }

  const r = Math.ceil((resto)/100) - 1;


  for (const key in eloDivisionCalculator) {
    if (eloDivisionCalculator[key] === r) {
      averageEloRank = key;
    }
  }

  console.log(parteIntera*400 + " " + r);
  if(averageEloTier=="MASTER" || averageEloTier=="CHALLENGER") averageEloRank = "";
  newMatchBox.querySelector('.otherStats .elo').textContent = averageEloTier.toLowerCase().charAt(0).toUpperCase() + averageEloTier.toLowerCase().slice(1) + " " + averageEloRank;*/

}

async function onJsonMatchv5(json) {
  console.log(json);

  for(matchID of json){
    matchById_url = "https://europe.api.riotgames.com/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY;
    //fetch(matchById_url).then(onResponse).then(onJsonMatchByID);

    //const response = await fetch(matchById_url);
    //const match = await response.json();
    //await onJsonMatchByID(match);

    try {
      const response = await fetch(matchById_url);
      if (response.ok == false) {
        console.log(response.ok);
        throw new Error('Errore durante la richiesta: ' + response.status);
      }
      const match = await response.json();
      await onJsonMatchByID(match);
    }
    catch (error) {
      console.log(error);
      console.log("Response error(404): match not found");
      console.log("There may be no more games in the server");
      break;
    }
  }

  filterButtons = document.querySelectorAll("#mainC2 #matchesNav span");
  for(item of filterButtons){
    item.addEventListener('click', filterMatches);
  }

  totalStats("");

}

function showMoreStats(event){
  moreStats = event.currentTarget.parentNode.parentNode.querySelector(".moreStats");
  arrow = event.currentTarget.querySelector(".arrow")
  if(moreStats.classList.contains("hidden")){
    moreStats.classList.remove("hidden");
    arrow.classList.add("opened");
  }
  else{
    moreStats.classList.add("hidden");
    arrow.classList.remove("opened");
  }
}

function onJsonSummonerv4(json) {
    console.log(json);
    if(json == null){
        console.log("Errore: response null")
        return;
    }

    id = json.id;
    accountId = json.accountId;
    profileIconId = json.profileIconId;
    revisionDate = json.revisionDate;
    summonerLevel = json.summonerLevel;

    document.querySelector('#profileLvl').textContent=summonerLevel;

    league_v4_url = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + "?api_key=" +  API_KEY;
    fetch(league_v4_url).then(onResponse).then(onJsonLeaguev4);
    fetch("https://ddragon.leagueoflegends.com/cdn/" + game_version + "/data/en_US/profileicon.json").then(onResponse).then(onJsonProfileIcon);
}
function onJsonProfileIcon(json){
  ProfileIcon_url = json["data"][profileIconId]["image"]["full"];
  console.log(ProfileIcon_url);
  
  document.querySelector('#profileIcon').src = "https://ddragon.leagueoflegends.com/cdn/" + game_version + "/img/profileicon/" + ProfileIcon_url
}

function onJsonLeaguev4(json){
 
  if(json.length == 0) return;
  
  let ranked_solo_index = -1;
  let ranked_flex_index = -1;

  for(let i=0; i<json.length; i++){
    if(json[i]["queueType"] == "RANKED_SOLO_5x5")  ranked_solo_index = i;
    if(json[i]["queueType"] == "RANKED_FLEX_SR")  ranked_flex_index = i;
  }

 

 
  if(ranked_solo_index!=-1){
  ranked_solo_img_url = 'Rank=' + json[ranked_solo_index]["tier"].toLowerCase() +'.png';
  let wins = parseInt(json[ranked_solo_index]["wins"]);
  let losses = parseInt(json[ranked_solo_index]["losses"]);
  let wr = wins/(wins + losses);

  document.querySelector('.rankedInfoBox[data-ranked-type="solo"] .rankedEmblem').src="Ranked Emblems Latest/" + ranked_solo_img_url;
  document.querySelector('.rankedInfoBox[data-ranked-type="solo"] .tier').textContent= capitalizeFirstLetter(json[ranked_solo_index]["tier"]) + " " + json[ranked_solo_index]["rank"];
  document.querySelector('.rankedInfoBox[data-ranked-type="solo"] .leaguePoints').textContent=json[ranked_solo_index]["leaguePoints"] + " LP";
  document.querySelector('.rankedInfoBox[data-ranked-type="solo"] .WL').textContent= json[ranked_solo_index]["wins"] + "W " + json[ranked_solo_index]["losses"] + "L";
  document.querySelector('.rankedInfoBox[data-ranked-type="solo"] .wrPerc').textContent = "Win Rate " + (wr*100).toFixed(2) + "%";
  }

  if(ranked_flex_index!=-1){
  ranked_flex_img_url = 'Rank=' + json[ranked_flex_index]["tier"].toLowerCase() +'.png';
  wins = parseInt(json[ranked_flex_index]["wins"]);
  losses = parseInt(json[ranked_flex_index]["losses"]);
  wr = wins/(wins + losses);

  document.querySelector('.rankedInfoBox[data-ranked-type="flex"] .rankedEmblem').src="Ranked Emblems Latest/" + ranked_flex_img_url;
  document.querySelector('.rankedInfoBox[data-ranked-type="flex"] .tier').textContent= capitalizeFirstLetter(json[ranked_flex_index]["tier"]) + " " + json[ranked_flex_index]["rank"];
  document.querySelector('.rankedInfoBox[data-ranked-type="flex"] .leaguePoints').textContent=json[ranked_flex_index]["leaguePoints"] + " LP";
  document.querySelector('.rankedInfoBox[data-ranked-type="flex"] .WL').textContent= json[ranked_flex_index]["wins"] + "W " + json[ranked_flex_index]["losses"] + "L";
  document.querySelector('.rankedInfoBox[data-ranked-type="flex"] .wrPerc').textContent = "Win Rate " + (wr*100).toFixed(2) + "%";
  }
}


function onResponse(response) {
  if(response.ok == false){
    console.log(response.status);
    console.log("Error: " + response.statusText);
    window.location.href = 'SummonerNotFound.html';
    return null;
  }
  console.log('Risposta ricevuta');
  return response.json();
}

async function prepareData(){
  const game_version_response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
  game_version_json = await game_version_response.json();
  game_version = game_version_json[0];

  const response_runes = await fetch('http://127.0.0.1/runesReforged.json');
  runesJson = await response_runes.json();


  const response_queue = await fetch("https://static.developer.riotgames.com/docs/lol/queues.json");
  queueJson = await response_queue.json();

  const response_summoners = await fetch("https://ddragon.leagueoflegends.com/cdn/" + game_version + "/data/en_US/summoner.json");
  const summoners = await response_summoners.json();
  summonersJson = summoners["data"];
}

const eloRankCalculator = {
  "IRON": 0,
  "BRONZE": 400,
  "SILVER": 800,
  "GOLD": 1200,
  "PLATINUM": 1600,
  "EMERALD": 2000,
  "DIAMOND": 2400,
  "MASTER": 2800,
  "CHALLENGER": 3200
}

const eloDivisionCalculator = {
  "IV": 0,
  "III": 1,
  "II": 2,
  "I": 3
}



let id; //summonerID
let accountId;
let profileIconId;
let revisionDate;
let summonerLevel;

let ProfileIcon_url;
let ranked_solo_img_url;
let ranked_flex_img_url;




let game_version_json;
let game_version;
let runesJson; 
let queueJson;
let summonersJson;

prepareData();

puuid = localStorage.getItem('puuid');
gameName = localStorage.getItem('gameName');
tagLine = localStorage.getItem('tagLine');

document.title = gameName + '#' + tagLine + ' - Summoner Stats - ' + 'League of Legends';
document.querySelector('#GameName').textContent=gameName;
document.querySelector('#tagLine').textContent='#' + tagLine;

    
summoner_v4_url = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/" + puuid + "?api_key=" + API_KEY;
fetch(summoner_v4_url).then(onResponse).then(onJsonSummonerv4);
const count = 20;
//const count = 20;
match_v5_url = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=" + count + "&api_key=" + API_KEY;
fetch(match_v5_url).then(onResponse).then(onJsonMatchv5);
