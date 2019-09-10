# Инициализация формы оплаты
Подключение:

```javascript
const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk');
```

1.Подключение модуля на странице генерации запроса

```javascript
const payeerMoney = require("../../payeer-payments-node-js-sdk");
const api = new payeerMoney.Wallet();
```
2.Создаем обьект данных платежа.

```javascript   
let formBody = { 
    m_shop: apiId,
    m_orderid: req.user._id,
    m_amount: minPay,
    m_curr: curr,
    m_desc: `Contribution from the user: ${req.user.username}`,
    apiKey: apiKey
};
```

3.Генерация адреса

```javascript
let url = api.createPayment(formBody);
```
4.Далие перенаправляем пользователя на полученный url.
    
#Обработка ответа GET

Обработчик платежа должен размещаться по адресу, указанному в настройках мерчанта в поле Status URL

1.Подключение модуля на странице генерации запроса

```javascript
const payeerMoney = require("../../payeer-payments-node-js-sdk");
const api = new payeerMoney.Wallet();
```

2.Создаем обьект данных m_sign для проверки подленности платежа.

```javascript
let formBody = { 
    m_operation_id: req.query.m_operation_id,  
    m_operation_ps: req.query.m_operation_ps,
    m_operation_date: req.query.m_operation_date,
    m_operation_pay_date: req.query.m_operation_pay_date,
    m_shop: apiId, //Идентификатор мерчанта зарегистрированного в системе Payeer на который будет совершен платеж
    m_orderid: req.query.m_orderid,
    m_amount: req.query.m_amount,
    m_curr: curr, //Валюта платежа
    m_desc: req.query.m_desc,
    m_status: req.query.m_status,
    m_key: apiKey // 'Ваш секретный ключ';
};
```

3.Генерация m_sign

```javascript
let myhash = payeerMoney.workingPayment.sha256(formBody);
```

4.Обработка результата

```javascript
if (req.query.m_status == "success" && myhash == req.query.m_sign) {
//истиность платежа установлена
} else {
//ошибка проверки
}
```

# Работа с кошельком
1.Подключение модуля

```javascript
const payeerMoney = require("../../payeer-payments-node-js-sdk");
const api = new payeerMoney.Wallet();
```

2.Проверка авторизации
Cамый простой запрос - проверка авторизации. Выполнять его отдельно от основных действий не обязательно.Для проверки авторизации необходимо отправить POST-запрос на URL https://payeer.com/ajax/api/api.php с тремя параметрами: account, apiId и apiPass:

```javascript
api.isAuth(accountNumber, apiId, apiKey)
.then(function(result) { // if response is positive
console.log(result);      
})
.catch(function(result) {// if response is negative
console.log(result);      
})
```