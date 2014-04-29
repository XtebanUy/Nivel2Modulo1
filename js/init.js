$(document).ready(function()
	{
		var application  = function()
		{
			var self = this;
			self.agenda = ko.observableArray([]);
			self.contacto = ko.observable();
			self.mode = ko.observable();
			
			self.guardarContacto = function(viewModel, event)
			{
				if (!event.target.form.checkValidity || event.target.form.checkValidity()) {
 
					var contactoObs = self.contacto()
					if (contactoObs.id == 0)
					{
						contactoObs.id = +localStorage.getItem('agendaMax');
						localStorage.setItem('agendaMax', contactoObs.id + 1);
					}
					var contacto = {id : contactoObs.id, Nombre: contactoObs.Nombre(), Apellido : contactoObs.Apellido(), Direccion : contactoObs.Direccion(),Telefono : contactoObs.Telefono(), Celular : contactoObs.Celular(), Email : contactoObs.Email()};
					var agenda = JSON.parse(localStorage.getItem('agenda'));

					agenda[contactoObs.id] = contacto;
					localStorage.setItem('agenda', JSON.stringify(agenda));
					location.hash = ""
				}
				else
				{
					// show some error
				}
			}
			self.editarContacto = function(contacto)
			{
				location.hash = "/contacto/" + contacto.id+"/edit";
			}

			self.mostrarContacto = function(contacto)
			{
				location.hash = "/contacto/" + contacto.id+"/show";
			}

			self.eliminarContacto = function(contacto)
			{
				var agenda = JSON.parse(localStorage.getItem('agenda'));
				delete agenda[contacto.id];
				localStorage.setItem('agenda', JSON.stringify(agenda));
				self.agenda($.map(agenda, function(value, index){return value}));
			}


			self.agregarContacto = function(contacto)
			{
				location.hash = "/nuevocontacto";
			}

			self.retornarRaiz = function(contacto)
			{
				location.hash = "";
			}
			var agenda = localStorage.getItem('agenda')
			if (agenda === undefined || agenda === null)
        	{
        		agenda = {};
        		localStorage.setItem('agenda', JSON.stringify(agenda));
        		localStorage.setItem('agendaMax', 1);
        	}

			var app = Sammy(function() {
		     
		        this.get('#/contacto/:id/:mode', function() {
		        	
		            var agenda = JSON.parse(localStorage['agenda']);
		            var id = this.params.id;
		            var element = agenda[id];
		            if (element)
		            {
		            	if(this.params.mode == "edit")
		            	{
		            		self.mode("edit")
		            	}
		            	else
		            	{
		            		self.mode("show")
		            	}
		            	var c = new contacto();
		            	c.id = element.id;
		            	c.Nombre(element.Nombre);
		            	c.Apellido(element.Apellido);
		            	c.Telefono(element.Telefono);
		            	c.Celular(element.Celular);
		            	c.Email(element.Email);
		            	c.Direccion(element.Direccion);
		            	self.contacto(c);
		            	self.agenda(null);
		            }

		        });
		        this.get('#/nuevocontacto', function() {
		        	self.mode("edit")
		        	var c = new contacto();
		            	c.id = 0;
		            	self.contacto(c);
		            	self.agenda(null);
		        });
		        this.get('', function() {
		            self.agenda($.map(JSON.parse(localStorage.getItem('agenda')), function(value, index){return value}) );
		            self.contacto(null);
		        });
		        
	    	});
			app.run()
		}
		var contacto = function()
		{
			this.id = 0
			this.Nombre = ko.observable()
			this.Apellido = ko.observable()
			this.Direccion = ko.observable()
			this.Telefono = ko.observable()
			this.Email = ko.observable()
			this.Celular = ko.observable()
		}
		ko.applyBindings(new application(), document.body)
		
	}
)



