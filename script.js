//réinitialisation
function recharger(tab){
	$(".case").css("background-color","green");
	casevide=9;
	let cpt=1;
	for(let i=0; i<3;i++){
		for(let j=0; j<3; j++){
			tab[i][j]=cpt;
			cpt++;
		}
	}
	return tab;
}

//On complète au fur et à mesure la position des "pions" des joueurs
function completetab(tab, num, tour){
	for (let i=0; i<3; i++){
		for(let j=0; j<3; j++){
			//bleu joue
			if(tab[i][j]==num && tour%2==0){
			tab[i][j]="x";
			}
			//rouge joue
			else if(tab[i][j]==num){
			tab[i][j]="o";
			}			
		}
	}
}

//On vérifie si le joueur a trois pions d'affilés
function troisdaffile(tab){
	let encours;
	let cptv =0;
	let cpth =0;
	//horizontalement
	for (let i=0; i<3; i++){
		for(let j=1; j<3; j++){
			encours=tab[i][j];
			if(encours==tab[i][j-1]){
				cpth++;
			}
			if(cpth==2){
				return true;
			}
		}
	cpth=0;
	}	
	//verticalement
	for (let i=0; i<3; i++){
		for(let j=1; j<3; j++){
			encours=tab[j][i];
			if(encours==tab[j-1][i]){
				cptv++;
			}
			if(cptv==2){
				return true;
			}
		}
	cptv=0
	}
	//en biais
	if(tab[0][0]==tab[1][1] && tab[1][1]==tab[2][2]){
		return true;
	}
	if(tab[0][2]==tab[1][1] && tab[1][1]==tab[2][0]){
		return true;
	}
	return false;
}

//attribution des points aux joueurs
function points(tour, scorerouge, scorebleu){
	if(tour%2==0){
		scorerouge++;
	}
	else{
		scorebleu++;
	}
}

$(document).ready(function(){
	//initialisation
	let scorerouge=0;
	let scorebleu=0;
	$("#rouge").text("Rouge : "+scorerouge);
	$("#bleu").text("Bleu : "+scorebleu);
	let tabwin = [
	[1,2,3],
	[4,5,6],
	[7,8,9]];
	casevide=9;
	//bouton
	$("#reset").click(function(){
		tabwin = recharger(tabwin);
	});
	//click cases
	$(".case").click(function(){
		let couleur=$(this).css("background-color");
		if (casevide%2==0){
			if(couleur =="rgb(0, 128, 0)"){
				$(this).css("background-color","red")
				casevide--;
			}
			else{
				alert("Case déjà prise !");
			}

		}
		else{
			if (couleur=="rgb(0, 128, 0)"){
				$(this).css("background-color","blue")
				casevide--;
			}
			else{
				alert("Case déjà prise !");
			}
		}
		let num = $(this).attr('id');
		completetab(tabwin, num, casevide);
		if(troisdaffile(tabwin)){
			if(casevide%2==0){
				scorebleu++;
				alert ("Bleu gagne");
			}
			else{
				scorerouge++;
				alert ("Rouge gagne");
			}
			$("#rouge").text("Rouge : "+scorerouge);
			$("#bleu").text("Bleu : "+scorebleu);
			tabwin = recharger(tabwin);
		}
		else if(casevide==0){
			alert("Match nul");
			tabwin=recharger(tabwin);
		}
	});

});