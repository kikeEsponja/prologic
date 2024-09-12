<script>
       async function createPaymentIntention(){
           const res = await fetch('https://leeresmipasion.com:1048/api/modo-checkout', {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({price: 77 })
               }  
           );
          
           const jsonRes = await res.json();
           return {
             checkoutId: jsonRes.id,
             qrString: jsonRes.qr,
             deeplink: jsonRes.deeplink,
           };
       }


        async function showModal() {
           const modalData = await createPaymentIntention();
           var modalObject = {
               qrString: modalData.qrString,
               checkoutId: modalData.checkoutId,
               deeplink:  {
                   url: modalData.deeplink,
                   callbackURL: 'https://tiendadeprueba.com/checkout',
                   callbackURLSuccess: 'https://tiendadeprueba/thankyou'
               },
               callbackURL: 'https://tiendadeprueba/thankyou'
               refreshData: createPaymentIntention,
  	           onSuccess: function () { console.log('onSuccess') },
               onFailure: function () { console.log('onFailure') },
               onCancel: function () { console.log('onCancel') },
               onClose: function () { console.log('onClose') },
           }


           ModoSDK.modoInitPayment(modalObject);
       }
</script>