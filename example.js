const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,    
    defaultViewport: null,
    args: ['--start-maximized'] 
   });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 0,
  });
  await page.goto('https://prestacorenotifier-pluginspartners.codeanyapp.com/prestashop17/', {
    waitUntil: 'load',
  });
  // Clicar no produto
  await Promise.all([
    page.waitForNavigation(),
    page.click('a[class="thumbnail product-thumbnail"]'),
  ]);
  console.log('Clicar no produto');
  // Adicionar no carrinho
  await Promise.all([
      page.click('button[class="btn btn-primary add-to-cart"]'),
    ]);
  console.log('Adicionar no carrinho');
  await page.waitForTimeout(1000);
  // Finalizar compra
  page.goto('https://prestacorenotifier-pluginspartners.codeanyapp.com/prestashop17/br/carrinho?action=show', {
    waitUntil: 'load',
  });
  await page.waitForTimeout(1000);
  console.log('Carregou pagina');
  await Promise.all([
    page.click('a[class="btn btn-primary"]'),
  ]);
  console.log('Clicou em Finalizar Compra');
})();
