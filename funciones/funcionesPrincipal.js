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
							
						'</tr>'
			}
			$('#registrosBD').html(cuerpo);
		},
		error: function(respuesta){
			console.log("Error al listar");
		}
	})
};



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
