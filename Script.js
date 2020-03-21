function valForm() {
	// VALIDA CHECKBOX
	if (document.getElementById("sim").checked){
		var checkboxs = document.getElementsByName("redeSocial");
		var okay = false;
		for (var i = 0, l = checkboxs.length; i < l; i++) {
			if (checkboxs[i].checked) {
				okay = true;
				break;
			}
		}

		if (okay) {
			create_send_Json();
			document.getElementById("submit").setAttribute("disabled", "true");
			return true;
		}
		else {
			alert("Favor informar qual redes sociais possui!");
			return false;
		}
	}
	else{
		create_send_Json();
		document.getElementById("submit").setAttribute("disabled", "true");
		return true;
	}
}
function validateName(input){
	// VALIDAÇÃO DE NOMES
	var nome = input.value;
	var regex =nome.match(/\b[a-záàâãéèêíïóôõöúçñ']{2,20}\b/ig);
	if (regex && regex.length >= 2) {
		return true;
	} else {
		alert("Digite nome e sobrenome validos");
		input.value = "";
		return false;
	}
}
function validateTel(input) {
	// VALIDAÇÃO DE TELEFONE
	var tel = input.value;
	var padrao1 = tel.match(/^[0-9]{2}-[0-9]{8}$/);
	var padrao2 = tel.match(/^[0-9]{10}$/);
	if (padrao1){
		return true;
	}
	else if(padrao2){
		var ddd = tel.substring(0,2);
		var resto = tel.substring(2);
		input.value = ddd + '-' + resto;
		return true;
	}
	else{
		alert("Digite um telefone válido");
		input.value = "";
		return false;

	}
}
function enableChk() {
	var x = 0;
	document.getElementById("nao").checked = false;
	var arr = document.getElementsByName("redeSocial");
	for (x; x < arr.length; x++) {
		arr[x].removeAttribute("disabled");
	}
}
function disableChk() {
	var x=0;
	document.getElementById("sim").checked = false;
	var arr = document.getElementsByName("redeSocial");
	for (x;x<arr.length;x++){
		arr[x].checked = false;
		arr[x].setAttribute("disabled", "true");
	}
}
function create_send_Json(){
	// CRIA O JSON
	var name = document.forms["formulario"]["nome"].value;
	var tel = document.forms["formulario"]["telefone"].value;
	var media = document.forms["formulario"]["media"].value;
	var rede = document.forms["formulario"]["possuiRedeSocial"].value;
	if (document.getElementById("sim").checked) {
		var array = [];
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
		for (var i = 0; i < checkboxes.length; i++) {
			array.push(checkboxes[i].value)
		}
	}

	data = { "Nome": name, "Telefone": tel, "Como conheceu": media, "Possui Rede": rede, "Redes": array};
	var jsonData = JSON.stringify(data);

	// ENVIA DADOS PARA O ENDPOINT (NÃO FUNCIONA)
	/*
	var xhr = new XMLHttpRequest();
	var url = 'http://localhost:8080';

	xhr.open("POST", url);
	xhr.send(jsonData);
	alert('status: '+xhr.status + ' ,readyState: '+xhr.readyState);
	*/
	// IMPRIME O JSON NA PRÓPRIA TELA DO FORMULARIO

	document.getElementById("output").innerHTML=jsonData;
	console.log(jsonData);
	return false;
}

