var name,json,data;
function load(mode)
{
	if (mode) {name=sessionStorage.ntename;}
	else {name=sessionStorage.ntvname;}
	data=localStorage[name];
	if (data=="{}$")
	{
		var ti=new Date(),tu;
		tu=String(ti.getFullYear())+"/"+String(ti.getMonth()+1).padStart(2,"0")+"/"+String(ti.getDate()).padStart(2,"0")+" "+String(ti.getHours()).padStart(2,"0")+":"+String(ti.getMinutes()).padStart(2,"0");
		json={};data="";json["make"]=tu;json["last"]=tu;json["edit"]=0;
		json["read"]=false;json["only"]="";json["show"]="";json["more"]="";
		localStorage[name]=JSON.stringify(json)+"$";return;
	}
	var u=data.indexOf("$");
	json=JSON.parse(data.substring(0,u));
	data=data.substr(u+1);
}
function gkey(note)
{
	var cookie=document.cookie.split(";");
	for (var i=0;i<cookie.length;i++)
	{
		var u=cookie[i];
		while(u[0]==" ")
		{u=u.substr(1);}
		if (!u.indexOf(note+"="))
		{return u.slice(note.length+2,-1);}
	}
	return "";
}