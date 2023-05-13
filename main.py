from mod_python import apache

postes=[[],[],[]]
colores=["red","blue","green","magenta","purple","cyan","#006699","orange"]
CHARMAX=0
N=0
paso=0

def init(n):
	global CHARMAX
	global N
	CHARMAX=2*n+3
	N=int(n)
	for i in range(n-1,-1,-1):
		postes[0].append(i)

def mover(desde,hasta):
	postes[hasta-1].append(postes[desde-1].pop())

def mostrarDisco(n):
	global CHARMAX
	espacios=(CHARMAX-(2*n+1))/2
	espacios_str="&nbsp;"*espacios
	codigo=espacios_str
	codigo=codigo+"<span style='color:"+colores[n%len(colores)]+"'>"+("#"*(2*n+1))+"</span>"
	codigo=codigo+espacios_str
	return codigo

def mostrarPoste(poste):
	global CHARMAX
	espacios=(CHARMAX-1)/2
	espacios_str="&nbsp;"*espacios
	columna=espacios_str+"|"+espacios_str

	codigo=columna+"\n"
	n_discos=len(postes[poste])
	if n_discos>0:
		n_aux=N-n_discos;
		while n_aux>0:
			codigo=codigo+columna+"\n"
			n_aux=n_aux-1
		for i in range(n_discos-1,-1,-1):
			codigo=codigo+mostrarDisco(postes[poste][i])+"\n"
	else:
		for i in range(0,N):
			codigo=codigo+columna+"\n"
	return codigo

def mostrar():
	global paso
	codigo=str(paso)+"<table>"
	codigo=codigo+"<tr>"
	for i in range(3):
		codigo=codigo+"<td><pre style='text-align: center'>"
		codigo=codigo+mostrarPoste(i)
		codigo=codigo+"</pre></td>"
	codigo=codigo+"</tr>";
	codigo=codigo+"</table><hr>"
	paso+=1
	return codigo

def hanoi(req,n,desde,hasta,aux):
	if n>0:
		hanoi(req,n-1,desde,aux,hasta)
		mover(desde,hasta)
		req.write(mostrar())
		hanoi(req,n-1,aux,hasta,desde)

def index(req,n=3):
	global CHARMAX
	global postes
	global paso
	req.content_type="text/html"
	postes=[[],[],[]]
	paso=0
	init(int(n))
	req.write(mostrar())
	hanoi(req,int(n),1,3,2)