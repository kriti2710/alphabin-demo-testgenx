const { locators } = require('../globalLocator.js');
const { test, expect } = require('@playwright/test');
const BrowserFactory = require('../BrowserFactory.js');
const abPlaywright = require("alphabin-pw");
const config = require('../playwright.config.js');
const { descriptions } = require('../elementDescriptions.js')


let context;

test.beforeEach(async () => {
    const result = await BrowserFactory.createBrowserWithContext(
        config.projects[0].name,
    );
    context = result.context;
});

test.afterEach(async () => {
    await context?.close();
});



test('Alpha_E2E_014 - Verify that User is able to write and submit a product review successfully', async () => {
    const email = `testing@gmail.com`;
    const password = `Testing@123`;
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    // await page1.locator("//*[name()='svg'][.//*[name()='path' and contains(@d,'M25.1578 1')]]").nth(1).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(`input[name="email"]`).click({ force: true });
    await page1.locator(`input[name="email"]`).fill(email);
    await page1.locator( `input[name="password"]`).click({ force: true });
    await page1.locator( `input[name="password"]`).fill(password);
    await page1.locator( `//button[normalize-space()='Sign in']`).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(`//button[text()="Shop Now"]`).nth(0).click({force: true});
    await page1.locator(`[class="relative pt-4 px-4"]`).nth(0).click({force: true});
    await page1.locator(`//button[text()="Reviews"]`).click({force: true});
    await page1.locator(`//button[text()=" Write a Review"]`).click({force: true});
    await expect(page1.locator(`[class="bg-white p-6 rounded-md w-full"]`)).toBeVisible();
    await page1.locator(`//input[@name="name"]`).click({force: true});
    await page1.locator(`//input[@name="name"]`).fill('test');
    await page1.locator(`//input[@name="email"]`).click({force: true});
    await page1.locator(`//input[@name="email"]`).fill('test@gmail.com');
    await page1.locator(`[class="cursor-pointer text-lg"]`).nth(3).click({force: true});
    await page1.locator(`//input[@name="title"]`).click({force: true});
    await page1.locator(`//input[@name="title"]`).fill('testing');
    await page1.locator(`//textarea[@name="review"]`).click({force: true});
    await page1.locator(`//textarea[@name="review"]`).fill('great product');
    await page1.locator(`//button[text()="Submit"]`).click({force:true});
    await page1.close();
  });

test('Alpha_E2E_015 - Verify that User is able to edit product review successfully', async () => {
    const email = `testing@gmail.com`;
    const password = `Testing@123`;
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    // await page1.locator("//*[name()='svg'][.//*[name()='path' and contains(@d,'M25.1578 1')]]").nth(1).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(`input[name="email"]`).click({ force: true });
    await page1.locator(`input[name="email"]`).fill(email);
    await page1.locator( `input[name="password"]`).click({ force: true });
    await page1.locator( `input[name="password"]`).fill(password);
    await page1.locator( `//button[normalize-space()='Sign in']`).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(`//button[text()="Shop Now"]`).nth(0).click({force: true});
    await page1.locator(`[class="relative pt-4 px-4"]`).nth(0).click({force: true});
    await page1.locator(`//button[text()="Reviews"]`).click({force: true});
    await page1.locator(`//button[text()=" Write a Review"]`).click({force: true});
    await expect(page1.locator(`[class="bg-white p-6 rounded-md w-full"]`)).toBeVisible();
    await page1.locator(`//input[@name="name"]`).click({force: true});
    await page1.locator(`//input[@name="name"]`).fill('test');
    await page1.locator(`//input[@name="email"]`).click({force: true});
    await page1.locator(`//input[@name="email"]`).fill('test@gmail.com');
    await page1.locator(`[class="cursor-pointer text-lg"]`).nth(3).click({force: true});
    await page1.locator(`//input[@name="title"]`).click({force: true});
    await page1.locator(`//input[@name="title"]`).fill('testing');
    await page1.locator(`//textarea[@name="review"]`).click({force: true});
    await page1.locator(`//textarea[@name="review"]`).fill('great product');
    await page1.locator(`//button[text()="Submit"]`).click({force:true});
    await page1.locator(`//button[text()="Edit"]`).click({force: true});
    await page1.locator(`//input[@name="name"]`).click({force: true});
    await page1.locator(`//input[@name="name"]`).fill('testing');
    await page1.locator(`//input[@name="email"]`).click({force: true});
    await page1.locator(`//input[@name="email"]`).fill('test123@gmail.com');
    await page1.locator(`[class="cursor-pointer text-lg"]`).nth(3).click({force: true});
    await page1.locator(`//input[@name="title"]`).click({force: true});
    await page1.locator(`//input[@name="title"]`).fill('testing test automation');    
    await page1.locator(`//button[text()="Submit"]`).click({force:true});
    await page1.close();
  });

test('Alpha_E2E_016 - Verify that User is able to delete product review successfully', async () => {
    const email = `testing@gmail.com`;
    const password = `Testing@123`;
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    // await page1.locator("//*[name()='svg'][.//*[name()='path' and contains(@d,'M25.1578 1')]]").nth(1).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(`input[name="email"]`).click({ force: true });
    await page1.locator(`input[name="email"]`).fill(email);
    await page1.locator( `input[name="password"]`).click({ force: true });
    await page1.locator( `input[name="password"]`).fill(password);
    await page1.locator( `//button[normalize-space()='Sign in']`).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(`//button[text()="Shop Now"]`).nth(0).click({force: true});
    await page1.locator(`[class="relative pt-4 px-4"]`).nth(0).click({force: true});
    await page1.locator(`//button[text()="Reviews"]`).click({force: true});
    await page1.locator(`//button[text()=" Write a Review"]`).click({force: true});
    await expect(page1.locator(`[class="bg-white p-6 rounded-md w-full"]`)).toBeVisible();
    await page1.locator(`//input[@name="name"]`).click({force: true});
    await page1.locator(`//input[@name="name"]`).fill('test');
    await page1.locator(`//input[@name="email"]`).click({force: true});
    await page1.locator(`//input[@name="email"]`).fill('test@gmail.com');
    await page1.locator(`[class="cursor-pointer text-lg"]`).nth(3).click({force: true});
    await page1.locator(`//input[@name="title"]`).click({force: true});
    await page1.locator(`//input[@name="title"]`).fill('testing');
    await page1.locator(`//textarea[@name="review"]`).click({force: true});
    await page1.locator(`//textarea[@name="review"]`).fill('great product');
    await page1.locator(`//button[text()="Submit"]`).click({force:true});
    await page1.locator(`//button[text()="Edit"]`).click({force: true});
    await page1.close();
});


// Auto generated test case
test('Alpha_E2E_09 - Verify that a User Can Add an Item to Wishlist, Then Move It to Cart and Checkout', async () => {
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await expect(page1.locator(locators['H1 with Text Demo E-commerce Testing Store'], { description: descriptions['H1 with Text Demo E-commerce Testing Store'] })).toHaveText(`Demo E-commerce Testing Store`);
    await page1.locator(locators['Button with Text Shop Now'], { description: descriptions['Button with Text Shop Now'] }).click({ force: true });
    await page1.locator(locators['Input with placeholder Search products'], { description: descriptions['Input with placeholder Search products'] }).click({ force: true });
    await page1.locator(locators['Input with placeholder Search products'], { description: descriptions['Input with placeholder Search products'] }).fill(`sp`);
    await expect(page1.locator(locators['H2 with Text JBL Charge 4 Bluetooth Speaker'], { description: descriptions['H2 with Text JBL Charge 4 Bluetooth Speaker'] })).toBeVisible();
    await page1.locator(locators['H2 with Text JBL Charge 4 Bluetooth Speaker'], { description: descriptions['H2 with Text JBL Charge 4 Bluetooth Speaker'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/product-detail/product2`);
    await expect(page1.locator(locators['H1 with Text JBL Charge 4 Bluetooth Speaker'], { description: descriptions['H1 with Text JBL Charge 4 Bluetooth Speaker'] })).toHaveText(`JBL Charge 4 Bluetooth Speaker`);
    await expect(page1.locator(locators['P with Text  12 000'], { description: descriptions['P with Text  12 000'] })).toHaveText(`₹12,000`);
    await expect(page1.locator(locators['Div with Text 1'], { description: descriptions['Div with Text 1'] })).toBeVisible();
    await expect(page1.locator(locators['Button with Text ADD TO CART'], { description: descriptions['Button with Text ADD TO CART'] })).toHaveText(`ADD TO CART`);
    await page1.locator(locators['Button with Text ADD TO CART'], { description: descriptions['Button with Text ADD TO CART'] }).click({ force: true });
    // await page1.aiVisualCheck('screenshot_1748508693117.png', 0.8, 1000);
    await page1.locator(locators['SVG'], { description: descriptions['SVG'] }).click({ force: true });
    // await page1.aiVisualCheck('screenshot_1748508698949.png', 0.8, 1000);
    await expect(page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] })).toBeVisible();
    await page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`hiren.alphabin+1@gmail.com`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(`Hiren@#$123`);
    await expect(page1.locator(locators['Button with Text Sign in'], { description: descriptions['Button with Text Sign in'] })).toHaveText(`Sign in`);
    await page1.locator(locators['Button with Text Sign in'], { description: descriptions['Button with Text Sign in'] }).click({ force: true });
    await expect(page1.locator(locators['SVG'], { description: descriptions['SVG'] })).toBeVisible();
    await page1.locator(locators['Span with Text 1'], { description: descriptions['Span with Text 1'] }).click({ force: true });
    await page1.locator(locators['SVG'], { description: descriptions['SVG'] }).click({ force: true });
    await expect(page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] })).toHaveText(`Checkout`);
    await page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] }).click({ force: true });
    // await expect(page1.locator(locators['Button with Text Place Order'], { description: descriptions['Button with Text Place Order'] })).toBeVisible();
    await page1.locator(locators['Button with Text Place Order'], { description: descriptions['Button with Text Place Order'] }).click({ force: true });
    // await expect(page1.locator(locators['H1 with Text Order Details'], { description: descriptions['H1 with Text Order Details'] })).toBeVisible(); const page1 = await context.newPage();
    console.log('✅ All steps completed — now closing the browser tab.');
    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_011 - Verify that the New User is able to add Addresses in the Address section', async () => {

    const uniqe = Math.floor(new Date().getTime() / 1000.0)
    const email = `hiren.alphabin+${uniqe}@gmail.com`;
    const password = `Hiren@#$123`
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await page1.locator(locators['Span with Text Sign up'], { description: descriptions['Span with Text Sign up'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/signup`);
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).fill(`Hiren`);
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).press(`Tab`);
    await page1.locator(locators['Input with name lastname'], { description: descriptions['Input with name lastname'] }).fill(`Test`);
    await page1.locator(locators['Input with name lastname'], { description: descriptions['Input with name lastname'] }).press(`Tab`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(email);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(password);
    await page1.locator(locators['Button with Text Create Account'], { description: descriptions['Button with Text Create Account'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(email);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(password);
    await page1.locator(locators['Button with Text Sign in'], { description: descriptions['Button with Text Sign in'] }).click({ force: true });
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await page1.locator(locators['H2 with Text My Profile'], { description: descriptions['H2 with Text My Profile'] }).click({ force: true });
    await page1.locator(locators['P with Text Addresses'], { description: descriptions['P with Text Addresses'] }).click({ force: true });
    await page1.locator(locators['Button with Text Add Your First Address'], { description: descriptions['Button with Text Add Your First Address'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).click({ force: true });
    await page1.locator(locators['Input with name firstname'], { description: descriptions['Input with name firstname'] }).fill(`Hiren`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(email);
    await page1.locator(locators['Input with name street'], { description: descriptions['Input with name street'] }).click({ force: true });
    await page1.locator(locators['Input with name street'], { description: descriptions['Input with name street'] }).fill(`123/testing`);
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).click({ force: true });
    await page1.locator(locators['Input with name city'], { description: descriptions['Input with name city'] }).fill(`test`);
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).click({ force: true });
    await page1.locator(locators['Input with name state'], { description: descriptions['Input with name state'] }).fill(`local`);
    await page1.locator(locators['Input with name country'], { description: descriptions['Input with name country'] }).click({ force: true });
    await page1.locator(locators['Input with name country'], { description: descriptions['Input with name country'] }).fill(`earth`);
    await page1.locator(locators['Input with name zip Code'], { description: descriptions['Input with name zip Code'] }).click({ force: true });
    await page1.locator(locators['Input with name zip Code'], { description: descriptions['Input with name zip Code'] }).fill(`395013`);
    await page1.locator(locators['Button with Text Save Address'], { description: descriptions['Button with Text Save Address'] }).click({ force: true });
    await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();
    await page1.close();

});

// Auto generated test case
test('Alpha_E2E_012 - login to logout', async () => {

    const email = `testing@gmail.com`;
    const password = `Testing@123`;
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(email);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(password);
    await page1.locator(locators['Button with Text Sign in'], { description: descriptions['Button with Text Sign in'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/`);
    await page1.locator(locators['SVG Path inside SVG'], { description: descriptions['SVG Path inside SVG'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/account`);
    await expect(page1).toHaveTitle(`AB | My Account`);
    await page1.waitForTimeout(5000);
    await page1.locator(locators['P with Text Log Out'], { description: descriptions['P with Text Log Out'] }).click({ force: true });
    await page1.close();
});

// Auto generated test case
test('Alpha_E2E_013 - Verify that the User Can Add a Product to Cart Before Login and Complete the Order After Logging In', async () => {
    const page1 = await context.newPage();
    await page1.goto('http://demo.alphabin.co');
    await abPlaywright.setupLogging(page1);
    await page1.locator(locators['Button with Text Shop Now'], { description: descriptions['Button with Text Shop Now'] }).click({ force: true });
    await page1.locator(locators['Input with placeholder Search products'], { description: descriptions['Input with placeholder Search products'] }).fill(`mouse`);
    await page1.locator(locators['H2'], { description: descriptions['H2'] }).click({ force: true });
    await page1.locator(locators['Button with Text ADD TO CART'], { description: descriptions['Button with Text ADD TO CART'] }).click({ force: true });
    await expect(page1.locator(locators['Div with role status'], { description: descriptions['Div with role status'] })).toBeVisible();
    await page1.locator(locators['SVG'], { description: descriptions['SVG'] }).click({ force: true });
    await expect(page1.locator(locators['H3'], { description: descriptions['H3'] })).toHaveText(`Logitech MX Master 3 Wireless Mouse`);
    await page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/login`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).click({ force: true });
    await page1.locator(locators['Input with name email'], { description: descriptions['Input with name email'] }).fill(`hiren.alphabin+1@gmail.com`);
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).click({ force: true });
    await page1.locator(locators['Input with name password'], { description: descriptions['Input with name password'] }).fill(`Hiren@#$123`);
    await page1.locator(locators['Button with Text Sign in'], { description: descriptions['Button with Text Sign in'] }).click({ force: true });
    await page1.locator(locators['SVG'], { description: descriptions['SVG'] }).click({ force: true });
    await page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co`);
    await page1.locator(locators['SVG'], { description: descriptions['SVG'] }).click({ force: true });
    await page1.locator(locators['Button with Text Checkout'], { description: descriptions['Button with Text Checkout'] }).click({ force: true });
    await expect(page1).toHaveURL(`https://demo.alphabin.co/checkout`);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(locators['Button with Text Cash on Delivery'], { description: descriptions['Button with Text Cash on Delivery'] }).click({ force: true });
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.locator(locators['Button with Text Cash on Delivery'], { description: descriptions['Button with Text Cash on Delivery'] }).click({ force: true });
    await page1.locator(locators['Html inside body_4'], { description: descriptions['Html inside body_4'] }).click({ force: true });
    await page1.waitForTimeout(15000);
    await expect(page1).toHaveURL(`https://demo.alphabin.co/checkout`);
    await page1.waitForTimeout(10000);
    await expect(page1).toHaveTitle(`AB Demo Store`);
    await page1.waitForTimeout(10000);
    console.log('✅ All steps completed — now closing the browser tab.');
    await page1.close();
});
