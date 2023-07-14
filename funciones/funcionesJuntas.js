$(document).ready(function(){
	console.log("Entro a la funcion de personal");
	llenarTabla();
});

//Listar
function llenarTabla(){
	//Ajax --- Es una metodologia de trabajo de manera asincrona - Nos permite hacer la comunicacion del cliente 
	//con el servidor --- atrvaes de los metodos ---- GET, POST, PUT..

	$.ajax({
		//http://localhost:9000/EmpleadosWs/listar
		method:'get',
		url:'http://localhost:8005/PersonalWs/listar',
		//url:'http://localhost:8005/AreaWs/listar',
		contentType:'application/json; charset=UTF-8',
		dataType:'json',
		success:function(respuesta){ //Recibimos la respuesta del servidor -- response
			console.log(respuesta);

			var cuerpo;

			for(var i=0; i<respuesta.length; i++){
				cuerpo += '<tr>'+
							'<td>'+respuesta[i].id+'</td>'+
							'<td>'+respuesta[i].nombre+'</td>'+
							'<td>'+respuesta[i].appaterno+'</td>'+
							'<td>'+respuesta[i].fecha_nacimiento+'</td>'+
							'<td>'+respuesta[i].status+'</td>'+
							'<td>'+respuesta[i].id_area+'</td>'+
							
							
						'</tr>'
			}
			$('#registrosBD').html(cuerpo);
		},
		error: function(respuesta){
			console.log("Error al listar");
		}
	})


};


