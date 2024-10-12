var companies = JSON.parse('{{ companies | tojson }}');
var car_models = JSON.parse('{{ car_models | tojson }}');
var years = JSON.parse('{{ years | tojson }}');
var fuel_types = JSON.parse('{{ fuel_types | tojson }}');

function load_car_models(company_id, car_model_id) {
    var company = document.getElementById(company_id);
    var car_model = document.getElementById(car_model_id);
    console.log(company.value);
    car_model.value = "";
    car_model.innerHTML = "";

    for (var i = 0; i < companies.length; i++) {
        if (companies[i] === company.value) {
            for (var j = 0; j < car_models.length; j++) {
                if (companies[i] === car_models[j]) {
                    var newOption = document.createElement("option");
                    newOption.value = car_models[j];
                    newOption.innerHTML = car_models[j];
                    car_model.appendChild(newOption);
                }
            }
        }
    }
}

function form_handler(event) {
    event.preventDefault(); // Don't submit the form normally
}

function send_data() {
    var fd = new FormData(document.querySelector('#carPriceForm'));
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/predict', true);
    document.getElementById('prediction').innerHTML = "Wait! Predicting Price.....";
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            document.getElementById('prediction').innerHTML = "Prediction: ₹" + xhr.responseText;
        }
    };
    xhr.send(fd);
}
