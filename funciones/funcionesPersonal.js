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
		url:'http://localhost:8005/EmployeeWS/listar',
		contentType:'application/json; charset=UTF-8',
		dataType:'json',
		success:function(respuesta){ //Recibimos la respuesta del servidor -- response
			console.log(respuesta);
			var cuerpo;

			for(var i=0; i<respuesta.length; i++){
				cuerpo += '<tr>'+
							'<td>'+respuesta[i].id+'</td>'+
							'<td>'+respuesta[i].name+'</td>'+
							'<td>'+respuesta[i].last_name+'</td>'+
							'<td>'+respuesta[i].birthdate+'</td>'+
							'<td>'+respuesta[i].genders.id+'</td>'+
							'<td>'+respuesta[i].genders.name+'</td>'+
							'<td>'+respuesta[i].jobs.id+'</td>'+
							'<td>'+respuesta[i].jobs.name+'</td>'+
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
	var name=$('#name').val();
	var last_name=$('#last_name').val();
	var birthdate=$('#birthdate').val();
	var genders=$('#genders').val();
	var jobs=$('#jobs').val();



	console.log(id);


		 if (id=='') {
			$('#id').focus();
			alert("el campo es obligatorio");
			
		}
		
		 else if (name=='') {
			$('#name').focus();
		}
		else if (last_name=='') {
			$('#last_name').focus();
		}
		else if (birthdate=='') {
			$('#birthdate').focus();
		}
		else if (genders=='') {
			$('#genders').focus();
		}
		else if (jobs=='') {
			$('#jobs').focus();
		}
		else{
			var json={  
		"id": id,
        "name":name,
        "last_name": last_name,
        "birthdate": birthdate,
        "genders": {
            "id": genders
        },
        "jobs": {
            "id": jobs
			}
		};
			console.log(json);

			$.ajax({
				type:'ajax',
				method: 'post',
				url:'http://localhost:8005/EmployeeWS/guardar',
				data:JSON.stringify(json),
				contentType:'application/json; charset=UTF-8',
				success:function(respuesta){
					const ahora=new Date();
			
					for(var i=0; i<respuesta.length; i++){
						var nombre=respuesta[i].name;
						var apellido=respuesta[i].last_name;
						var fecha=respuesta[i].birthdate;
						var fech=new Date(fecha);
						

					}
					var ano= fech.getFullYear();

					if(nombre!=name && apellido!=last_name){
						console.log("datos duplicados");
						console.log(ano);
						
						//console.log("se guardo");
					$('#modalAgregar').modal('hide');
					$('.alert-success').html("se guardo el empleado").fadeIn().delay(5000).fadeOut('snow');
					llenarTabla();
					
				}
					
				},
				error:function(respuesta){
					console.log("Error al guardar");
					alert("no se pueden guardar datos")
				}
			})
		}
	
});





$('body').on('click','#btnclose',function (e) {
        console.log('Cerrar');
        e.stopPropagation();
        $('#modalAgregar').modal('hide');

    });


$('body').on('click','#btnclose',function (e) {
        console.log('Cerrar');
        e.stopPropagation();
        $('#modalEditar').modal('hide');

    });

	$('body').on('click','#btnclose',function (e) {
        console.log('Cerrar');
        e.stopPropagation();
        $('#modalEliminar').modal('hide');

    });

//Para editar hay que buscar
$('#registrosBD').on('click','.btn-warning',function(){
	var id = $(this).attr('data');
	var json={"id":id};

	$.ajax({
		type:'ajax',
		method:'post',
		url:'http://localhost:8005/EmployeeWS/buscar',
		data:JSON.stringify(json),
		contentType:'application/json; charset=UTF-8',
		success:function(respuesta){
			$('#idE').val(id);
			$('#nameE').val(respuesta.name);
			$('#last_nameE').val(respuesta.last_name);
			$('#birthdateE').val(respuesta.birthdate);
			$('#birthdateE').val(respuesta.birthdate);
			$('#gendersE').val(respuesta.genders.id);
			$('#jobsE').val(respuesta.jobs.id);
			
			$('#modalEditar').modal('show');
		},
		error:function(respuesta){
			console.log("Error al buscar");
		}
	})
});

//Editar
$('#btnEditar').click(function(){
	var id=$('#idE').val();
	var name=$('#nameE').val();
	var last_name=$('#last_nameE').val();
	var birthdate=$('#birthdateE').val();
	var genders=$('#gendersE').val();
	var jobs=$('#jobsE').val();

	  if (name=='') {
			$('#nameE').focus();
		}
		else if (last_name=='') {
			$('#last_nameE').focus();
		}
		else if (birthdate=='') {
			$('#birthdateE').focus();
		}
		else if (genders=='') {
			$('#gendersE').focus();
		}
		else if (jobs=='') {
			$('#jobsE').focus();
		}
		else{
			var json={  
		"id": id,
        "name":name,
        "last_name": last_name,
        "birthdate": birthdate,
        "genders": {
            "id": genders
        },
        "jobs": {
            "id": jobs
			}
		}
			console.log(json);

		$.ajax({
			type: 'ajax',
			method:'post',
			url:'http://localhost:8005/EmployeeWS/editar',
			data:JSON.stringify(json),
			contentType:'application/json; charset=UTF-8',
			success:function(respuesta){
				
				$('#modalEditar').modal('hide');
				$('.alert-success').html("Se edito los datos del empleado").fadeIn().delay(5000).fadeOut('snow');
				listar();
			},
			error:function(respuesta){
				console.log("Error al editar");
			}
		})
	}
});

//Para eliminar hay que buscar
$('#registrosBD').on('click','.btn-danger',function(){
	var id = $(this).attr('data');
	var json={"id":id};

	$.ajax({
		type:'ajax',
		method:'post',
		url:'http://localhost:8005/EmployeeWS/buscar',
		data:JSON.stringify(json),
		contentType:'application/json; charset=UTF-8',
		success:function(respuesta){
			$('#idEli').val(id);
			$('#nameEli').val(respuesta.name);
			$('#last_nameEli').val(respuesta.last_name);
			$('#birthdateEli').val(respuesta.birthdate);
			$('#birthdateEli').val(respuesta.birthdate);
			$('#gendersEli').val(respuesta.genders.id);
			$('#jobsEli').val(respuesta.jobs.id);
			
			$('#modalEliminar').modal('show');
		},
		error:function(respuesta){
			console.log("Error al buscar");
		}
	})
});	

//Eliminar
$('#btnEliminar').click(function(){
	var id=$('#idEli').val();
	var name=$('#nameEli').val();
	var last_name=$('#last_nameEli').val();
	var birthdate=$('#birthdateEli').val();
	var genders=$('#gendersEli').val();
	var jobs=$('#jobsEli').val();

	  if (name=='') {
			$('#nameEli').focus();
		}
		else if (last_name=='') {
			$('#last_nameEli').focus();
		}
		else if (birthdate=='') {
			$('#birthdateEli').focus();
		}
		else if (genders=='') {
			$('#gendersEli').focus();
		}
		else if (jobs=='') {
			$('#jobsEli').focus();
		}
		else{
			var json={  
		"id": id,
        "name":name,
        "last_name": last_name,
        "birthdate": birthdate,
        "genders": {
            "id": genders
        },
        "jobs": {
            "id": jobs
			}
		}
			console.log(json);

		$.ajax({
			type: 'ajax',
			method:'post',
			url:'http://localhost:8005/EmployeeWS/eliminar',
			data:JSON.stringify(json),
			contentType:'application/json; charset=UTF-8',
			success:function(respuesta){
				
				$('#modalEliminar').modal('hide');
				$('.alert-success').html("Se Elimino los datos del empleado").fadeIn().delay(5000).fadeOut('snow');
				listar();
			},
			error:function(respuesta){
				console.log("Error al Eliminar");
			}
		})
	}
});



//buscar



		function search(){
			var num_cols, display, input, filter, table_body, tr, td, i, txtValue;
			num_cols = 3;
			input = document.getElementById("q");
			filter = input.value.toUpperCase();
			table_body = document.getElementById("the_table_body");
			tr = table_body.getElementsByTagName("tr");

			for(i=0; i< tr.length; i++){				
				display = "none";
				for(j=0; j < num_cols; j++){
					td = tr[i].getElementsByTagName("td")[j];
					if(td){
						txtValue = td.textContent || td.innerText;
						if(txtValue.toUpperCase().indexOf(filter) > -1){
							display = "";
						}
					}
				}
				tr[i].style.display = display;
			}
		}	


    (function(document) {
      'use strict';

      var LightTableFilter = (function(Arr) {

        var _input;

        function _onInputEvent(e) {
          _input = e.target;
          var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
          Arr.forEach.call(tables, function(table) {
            Arr.forEach.call(table.tBodies, function(tbody) {
              Arr.forEach.call(tbody.rows, _filter);
            });
          });
        }

        function _filter(row) {
          var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
          row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
        }

        return {
          init: function() {
            var inputs = document.getElementsByClassName('light-table-filter');
            Arr.forEach.call(inputs, function(input) {
              input.oninput = _onInputEvent;
            });
          }
        };
      })(Array.prototype);

      document.addEventListener('readystatechange', function() {
        if (document.readyState === 'complete') {
          LightTableFilter.init();
        }
      });

    })(document);