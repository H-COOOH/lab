const Pi=3.14159265359,Ei=2.71828182846;
var As=0,Ac=0,S=new Array(),C=new Array();
function f(c)
{
	if (c=="(") {return 0;}
	if (c=="+"||c=="-") {return 1;}
	if (c=="*"||c=="/")	{return 2;}
	if (c=="^") {return 3;}
	if (c=="S"||c=="C"||c=="T"||c=="L"||c=="G"||c=="R") {return 4;}
	return -1;
}
function g()
{
	var c=C[Ac];Ac--;
	var m=S[As];As--;
	if (c=="S") {As++;S[As]=Math.sin(m);}
	if (c=="C") {As++;S[As]=Math.cos(m);}
	if (c=="T") {As++;S[As]=Math.tan(m);}
	if (c=="L") {As++;S[As]=Math.log(m);}
	if (c=="G") {As++;S[As]=Math.sqrt(m);}
	if (c=="R") {As++;S[As]=R(m);}
	if (c=="S"||c=="C"||c=="T"||c=="L"||c=="G"||c=="R") {return;}
	var n=S[As];As--;
	if (c=="+") {As++;S[As]=n+m;}
	if (c=="-") {As++;S[As]=n-m;}
	if (c=="*") {As++;S[As]=n*m;}
	if (c=="/") {As++;S[As]=n/m;}
	if (c=="^") {As++;S[As]=Math.pow(n,m);}
}
function W(Q)
{
	if (!Q.length) {return 0;}
	As=0;
	var u=0,v=0,flag=false;
	for (var i=0;i<Q.length;i++)
	{
		if (Q[i]=="P") {As++;S[As]=Pi;continue;}
		if (Q[i]=="E") {As++;S[As]=Ei;continue;}
		if (Q[i]>="0"&&Q[i]<="9")
		{
			if (v) {u+=parseInt(Q[i])/v;v*=10;}
			else {u=u*10+parseInt(Q[i]);}
			flag=true;continue;
		}
		if (Q[i]==".") {v=10;continue;}
		if (flag) {As++;S[As]=u;u=0;v=0;flag=false;}
		if (Q[i]=="("||!Ac) {Ac++;C[Ac]=Q[i];continue;}
		if (Q[i]==")")
		{while(C[Ac]!="(") {g();}Ac--;continue;}
		while(Ac&&f(C[Ac])>=f(Q[i])) {g();}
		Ac++;C[Ac]=Q[i];
	}
	if (flag) {As++;S[As]=u;}
	while(Ac) {g();}
	return S[As];
}