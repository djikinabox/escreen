var app = new Vue({
    el: "#vue-app",
    data: {
        text: 'Unesite adresu za pretragu:',
        address: 'Kralja Aleksandra Beograd',
        result: {},
        lat: 0,
        long: 0,
        message: 'Aplikacija ceka upit'
    },
    methods: {
        findLatLong: function() {
            
            var linkAddress = this.address.replace(/\s/gm,'+');
            axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+linkAddress+'?key=AIzaSyAqF7gDTrLOmbT3N6TXsmULXRwYCcx6rt0')
            .then(response => (this.result = response.data));
            switch (this.result.status){
                    case 'OK':   
                        this.lat = this.result.results[0].geometry.location.lat;
                        this.long = this.result.results[0].geometry.location.lng;
                        this.message = 'Pronadjena je ulica sa koordinatima: ' + this.lat + '/' + this.long;
                        var map = new google.maps.Map(
                            document.getElementById('map'), {zoom: 15, center: {lat: this.lat, lng: this.long}});
                        
                        var marker = new google.maps.Marker({position: { lat:this.lat , lng:this.long }, map: map})
                        break;
                    
                    case 'ZERO_RESULTS':
                        this.message = 'Nema rezultata za trazenu adresu';
                        break;
                    
                    case 'OVER_DAILY_LIMIT':
                        this.message = 'Previse dnevnih upita';
                        break;
                    
                    case 'OVER_QUERY_LIMIT':
                        this.message = 'Prevelih broj upita';
                        break;
                    
                    case 'REQUEST_DENIED':
                        this.message = 'Zahtev je odbijen';
                        break;
                    
                    case 'INVALID_REQUEST':
                        this.message = 'Neispravno unet upit (address, components or latlng missing)';
                        break;
                    
                    case 'UNKNOWN_ERROR':
                        this.message = 'Zahtev nije mogao biti obradjen na serveru. Pokusajte kasnije';
                        break;
            }
        }
        
    }
    
});