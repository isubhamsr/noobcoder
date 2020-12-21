from django.shortcuts import render
import braintree
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        environment=braintree.Environment.Sandbox,
        merchant_id="t79v5wmvkc5kf9rb",
        public_key="rwy5t4b3ghkv74ws",
        private_key="36f25650ce1ee57f29f76f93c9d1cbd6"
    )
)


def validate_user_seassion(id, token):
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False


@csrf_exempt
def genarate_token(request, id, token):
    print(type(id))
    if not validate_user_seassion(id, token):
        return JsonResponse({'error':  True, 'message': 'Invalid seassion, Please Login!'})

    # client_token = gateway.client_token.generate({
    #     "customer_id": id
    # })
    return JsonResponse({'error': False, 'clientToken': gateway.client_token.generate()})


@csrf_exempt
def process_payment(request, id, token):
    if not validate_user_seassion(id, token):
        return JsonResponse({'error':  True, 'message': 'Invalid seassion, Please Login!'})

    nonce_from_the_client = request.POST['paymentMethodNonce']
    amount_from_the_client = request.POST['amount']

    result = gateway.transaction.sale({
        "amount": amount_from_the_client,
        "payment_method_nonce": nonce_from_the_client,
        # "device_data": device_data_from_the_client,
        "options": {
            "submit_for_settlement": True
        }
    })

    if result.is_success:
        return JsonResponse({'success':  result.is_success, 'message': 'Transaction Successfull', 'transaction': {'id' : result.transaction.id,'amount': result.transaction.amount}})
    else:
        return JsonResponse({'error': True, 'message': 'Transaction not Successfull'})
