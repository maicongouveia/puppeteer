const chromium = require('puppeteer');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,    
    defaultViewport: null,
    args: ["--window-size=1920,1040"] 
   })
  const page = await browser.newPage()
  const navigationPromise = page.waitForNavigation()
  await page.goto('https://prestacorenotifier-pluginspartners.codeanyapp.com/index.php')

  await page.waitForSelector('.products > .product-miniature:nth-child(1) > .thumbnail-container > .thumbnail > img')
  await page.click('.products > .product-miniature:nth-child(1) > .thumbnail-container > .thumbnail > img')

  await navigationPromise
  await page.waitForSelector('#add-to-cart-or-refresh > div.product-add-to-cart > div > div.add > button')
  await page.click('#add-to-cart-or-refresh > div.product-add-to-cart > div > div.add > button')

  await page.waitForTimeout(5000);

  await page.goto('https://prestacorenotifier-pluginspartners.codeanyapp.com/index.php?controller=cart&action=show')

  await page.waitForSelector('.cart-grid-right > .card > .checkout > .text-sm-center > .btn')
  await page.click('.cart-grid-right > .card > .checkout > .text-sm-center > .btn')

  await page.waitForSelector('#checkout-personal-information-step > .content > .nav > .nav-item:nth-child(3) > .nav-link')
  await page.click('#checkout-personal-information-step > .content > .nav > .nav-item:nth-child(3) > .nav-link')
  
  await page.type('#login-form > section > .form-group > .col-md-6 > .form-control', 'guveia.maicon@gmail.com')
    
  await page.waitForSelector('#login-form > section > div:nth-child(3) > .col-md-6 > .input-group > .form-control')
  await page.type('#login-form > section > div:nth-child(3) > .col-md-6 > .input-group > .form-control', '12345')
  
  //Login
  await page.waitForSelector('.tab-content > #checkout-login-form > #login-form > .form-footer > .continue')
  await page.click('.tab-content > #checkout-login-form > #login-form > .form-footer > .continue')
  
  //Clicar em endereço
  await page.waitForSelector('.content > .js-address-form > form > .clearfix > .btn')
  await page.click('.content > .js-address-form > form > .clearfix > .btn')

  await navigationPromise

  //Seleciona entrega
  await page.waitForSelector('#checkout-delivery-step > .content > .delivery-options-list > #js-delivery > .continue')
  await page.click('#checkout-delivery-step > .content > .delivery-options-list > #js-delivery > .continue')

  await navigationPromise
  
  //Pagamento em boleto
  await page.waitForSelector('#payment-option-5')
  await page.click('#payment-option-5')

  await page.waitForTimeout(500);

  await page.type('#mp_doc_number', '191.191.191-00')

  await page.type('#mp_number', '202')

  await page.select('#mp_state', 'SP')

  await page.waitForSelector('#conditions-to-approve > ul > li > div > span > input')
  await page.click('#conditions-to-approve > ul > li > div > span > input')

  await page.waitForSelector('#checkout-payment-step > .content > #payment-confirmation > .ps-shown-by-js > .btn')  
  await page.click('#checkout-payment-step > .content > #payment-confirmation > .ps-shown-by-js > .btn')

  await navigationPromise

  await page.waitForTimeout(10000);
  
  await browser.close()

})();
