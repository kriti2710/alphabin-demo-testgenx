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
    const email = `test.user12@gmail.com`;
    const password = `Test@12345`;
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
    const email = `test.user12@gmail.com`;
    const password = `Test@12345`;
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
    const email = `test.user12@gmail.com`;
    const password = `Test@12345`;
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
test('Alpha_E2E_012 - login to logout', async () => {

    const email = `test.user12@gmail.com`;
    const password = `Test@12345`;
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
