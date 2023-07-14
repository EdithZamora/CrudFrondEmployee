$(document).ready(function(){
	console.log("Entro a la funcion de horas");
	llenarTabla();
});

//Listar
function llenarTabla(){
	//Ajax --- Es una metodologia de trabajo de manera asincrona - Nos permite hacer la comunicacion del cliente 
	//con el servidor --- atrvaes de los metodos ---- GET, POST, PUT..

	$.ajax({
		//http://localhost:9000/EmpleadosWs/listar
		method:'get',
		url:'http://localhost:8005/EmployeeHoursWS/listar',
		contentType:'application/json; charset=UTF-8',
		dataType:'json',
		success:function(respuesta){ //Recibimos la respuesta del servidor -- response
			console.log(respuesta);
			var cuerpo;

			for(var i=0; i<respuesta.length; i++){
				cuerpo += '<tr>'+
							'<td>'+respuesta[i].id+'</td>'+
							'<td>'+respuesta[i].worked_hours+'</td>'+
							'<td>'+respuesta[i].worked_date+'</td>'+
							'<td>'+respuesta[i].employees.id+'</td>'+
							'<td>'+respuesta[i].employees.name+'</td>'+
							'<td> <a class="btn btn-warning" data="'+respuesta[i].id+'"> <i class="fa fa-fw fa-sync"></i></a></td>'+
							'<td> <a class="btn btn-danger" data="'+respuesta[i].id+'"> <i class="fa fa-fw fa-trash"></i></a></td>'
						'</tr>'
			}
			$('#registrosBD').html(cuerpo);
		},
		error: function(respuesta){
			console.log("Error al listar");
		}
	})
};

$('#btnModal').click(function(){
	$('#modalAgregar').modal('show');
});

$('#btnGuardar').click(function(){
	var id=$('#id').val();
	var worked_hours=$('#worked_hours').val();
	var worked_date=$('#worked_date').val();
	var employees=$('#employees').val();



	console.log(id);


		 if (id=='') {
			$('#id').focus();
			alert("el campo es obligatorio");
			
		}
		
		else if (worked_hours=='') {
			$('#worked_hours').focus();
		}
		else if (worked_date=='') {
			$('#worked_date').focus();
		}
		else if (employees=='') {
			$('#employees').focus();
		}
		
		else{
			var json= {
        "id": id,
        "worked_hours": worked_hours,
        "worked_date": worked_date,
        "employees": {
            "id": employees
           
        }
    };
			console.log(json);

			$.ajax({
				type:'ajax',
				method: 'post',
				url:'http://localhost:8005/EmployeeHoursWS/guardar',
				data:JSON.stringify(json),
				contentType:'application/json; charset=UTF-8',
				success:function(respuesta){
					//console.log("se guardo");
					$('#modalAgregar').modal('hide');
					$('.alert-success').html("se guardo las horas").fadeIn().delay(5000).fadeOut('snow');
					llenarTabla();
				},
				error:function(respuesta){
					console.log("Error al guardar");
				}
			})
		}
	
});
$('body').on('click','#btnclose',function (e) {
        console.log('Cerrar');
        e.stopPropagation();
        $('#modalAgregar').modal('hide');

    });