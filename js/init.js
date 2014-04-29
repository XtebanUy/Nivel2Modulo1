$(document).ready(function()
	{
		var application  = function()
		{
			var self = this;
			self.agenda = ko.observableArray([]);
			self.contacto = ko.observable();
			self.guardarContacto = function()
			{
				var contactoObs = self.contacto()
				if (contactoObs.id == 0)
				{
					contactoObs.id = +localStorage.getItem('agendaMax');
					localStorage.setItem('agendaMax', contactoObs.id + 1);
				}
				var contacto = {id : contactoObs.id, Nombre: contactoObs.Nombre(), Apellido : contactoObs.Apellido()};
				var agenda = JSON.parse(localStorage.getItem('agenda'));

				agenda[contactoObs.id] = contacto;
				localStorage.setItem('agenda', JSON.stringify(agenda));
				location.hash = null
			}
			self.editarContacto = function(contacto)
			{
				location.hash = "/contacto/" + contacto.id;
			}

			self.agregarContacto = function(contacto)
			{
				location.hash = "/contacto";
			}
			var agenda = localStorage.getItem('agenda')
			if (agenda === undefined || agenda === null)
        	{
        		agenda = {};
        		localStorage.setItem('agenda', JSON.stringify(agenda));
        		localStorage.setItem('agendaMax', 1);
        	}

			var app = Sammy(function() {
		     
		        this.get('#/contacto/:id', function() {
		        	
		            var agenda = JSON.parse(localStorage['agenda']);
		            var id = this.params.id;
		            var element = agenda[id];
		            if (element)
		            {
		            	var c = new contacto();
		            	c.id = element.id;
		            	c.Nombre(element.Nombre);
		            	c.Apellido(element.Apellido);
		            	self.contacto(c);
		            	self.agenda(null);
		            }

		        });
		        this.get('#/contacto', function() {
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
		}
		ko.applyBindings(new application(), document.body)
		
	}
)



