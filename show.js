function O(to)
{
	to=to+"\n";
	var all=new Array(),u="";
	for (var i=0;i<to.length;i++)
	{
		if (to[i]=="\n")
		{all.push(u);u="";}
		else
		{u=u+to[i];}
	}
	var re="",c=0;
	var flag=new Array(),hide=0,uf=0;
	flag.push(0);
	for (var i=0;i<all.length;i++)
	{
		if (all[i][0]=="@")
		{
			if (all[i]=="@o") {flag.push(1);re+="<ul>";}
			else if (all[i]=="@n") {flag.push(2);re+="<ol>";}
			else if (all[i]=="@q") {flag.push(3);re+="<blockquote>";}
			else if (all[i]=="@x") {flag.push(4);hide++;}
			else if (all[i]=="@s") {re+="<hr>";}
			else if (all[i]=="@e")
			{
				uf=flag.pop();
				if (uf==1) {re+="</ul>";}
				if (uf==2) {re+="</ol>";}
				if (uf==3) {re+="</blockquote>";}
				if (uf==4) {hide--;}
				if (!flag.length) {flag.push(0);}
			}
			else {re+="<br>";}
			continue;
		}
		if (hide) {continue;}
		var ru="",ki="",ui="";
		for (var j=0;j<all[i].length;j++)
		{
			if (all[i][j]=="{")
			{
				for (j++;all[i][j]!="|"&&j<all[i].length;j++) {ki+=all[i][j];}
				if (ki=="#") {ui="<h2>";}
				if (ki=="/") {ui="<i>";}
				if (ki=="*") {ui="<b>";}
				if (ki=="?") {ui="<del>";}
				if (ki=="!") {ui="<ins>";}
				if (ki=="r") {ui="<span style=\"color:red\">";}
				if (ki=="g") {ui="<span style=\"color:green\">";}
				if (ki=="b") {ui="<span style=\"color:blue\">";}
				ru+=ui;
			}
			else if (all[i][j]=="}")
			{
				if (ki=="#") {ui="</h2>";}
				if (ki=="/") {ui="</i>";}
				if (ki=="*") {ui="</b>";}
				if (ki=="?") {ui="</del>";}
				if (ki=="!") {ui="</ins>";}
				if (ki=="r"||ki=="g"||ki=="b") {ui="</span>";}
				ru+=ui;ki="";
			}
			else if (all[i][j]=="\\") {j++;ru+=all[i][j];c++;}
			else {ru+=all[i][j];c++;}
		}
		uf=flag[flag.length-1];
		if (uf==0||uf==3) {re+="<p>"+ru+"</p>";}
		if (uf==1||uf==2) {re+="<li>"+ru+"</li>";}
	}
	return [re,c];
}