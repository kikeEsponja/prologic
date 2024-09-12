const createPreference = async () => {
    try{
        const response = await axios.post("https://leeresmipasion.com:3333/create_preference", 
        {
            title: "sección CSS",
            quantity: 1,
            price: 100,
        });

        const { id } = response.data;
        return id;
    }catch(error){
        console.log(error);
    }
};

const handleBuy = async () => {
    const preferenceId = await createPreference();
    if(preferenceId){
        const mpButton = document.createElement('button');
        mpButton.textContent = 'Pagar con Mercado pago';
        mpButton.onclick = function(){
            window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${preferenceId}`;
        };
        document.body.appendChild(mpButton);
    }
};

document.getElementById('pagar').addEventListener('click', handleBuy);